import { useState, useRef, useEffect } from "react";
import Navigation from "@/components/Navigation";
import ChatMessage from "@/components/chatbot/ChatMessage";
import ChatInput from "@/components/chatbot/ChatInput";
import SuggestedQuestions from "@/components/chatbot/SuggestedQuestions";
import CropPredictionForm from "@/components/chatbot/CropPredictionForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, Loader2, Sprout } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { streamChat } from "@/utils/chatStream";

type Message = { role: "user" | "assistant"; content: string };

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (input: string) => {
    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    let assistantContent = "";
    const upsertAssistant = (chunk: string) => {
      assistantContent += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, content: assistantContent } : m
          );
        }
        return [...prev, { role: "assistant", content: assistantContent }];
      });
    };

    try {
      await streamChat({
        messages: [...messages, userMsg],
        onDelta: (chunk) => upsertAssistant(chunk),
        onDone: () => setIsLoading(false),
      });
    } catch (e) {
      console.error(e);
      setIsLoading(false);
      toast({
        title: "Error",
        description: e instanceof Error ? e.message : "Failed to get response",
        variant: "destructive",
      });
      setMessages((prev) => prev.filter((m) => m !== userMsg));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Tabs defaultValue="chat" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <Bot className="h-4 w-4" />
              AI Assistant
            </TabsTrigger>
            <TabsTrigger value="prediction" className="flex items-center gap-2">
              <Sprout className="h-4 w-4" />
              Crop Prediction
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat">
            <Card className="shadow-soft border-border/50">
              <CardHeader className="border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Bot className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Agricultural AI Assistant</CardTitle>
                    <CardDescription>
                      Get expert advice on farming, crops, soil health, and more
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <div className="flex flex-col gap-6">
                  {/* Messages Area */}
                  <div className="min-h-[400px] max-h-[500px] overflow-y-auto space-y-4 pr-2">
                    {messages.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-[400px] text-center">
                        <div className="p-4 rounded-full bg-primary/10 mb-4">
                          <Bot className="h-12 w-12 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          Welcome to AgroSense AI
                        </h3>
                        <p className="text-muted-foreground mb-6 max-w-md">
                          I'm here to help you with all your agricultural questions. 
                          Ask me anything about farming!
                        </p>
                        <SuggestedQuestions onSelect={sendMessage} />
                      </div>
                    ) : (
                      <>
                        {messages.map((msg, idx) => (
                          <ChatMessage key={idx} role={msg.role} content={msg.content} />
                        ))}
                        {isLoading && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span className="text-sm">Thinking...</span>
                          </div>
                        )}
                        <div ref={messagesEndRef} />
                      </>
                    )}
                  </div>

                  {/* Input Area */}
                  <div className="border-t border-border pt-4">
                    <ChatInput onSend={sendMessage} disabled={isLoading} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prediction">
            <CropPredictionForm />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Chatbot;
