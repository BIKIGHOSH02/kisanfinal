import { Button } from "@/components/ui/button";
import { Sprout } from "lucide-react";

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void;
}

const questions = [
  "How can I improve soil nitrogen levels?",
  "What's the best irrigation schedule for rice?",
  "How do I prevent pest attacks naturally?",
  "When should I apply fertilizer?",
];

const SuggestedQuestions = ({ onSelect }: SuggestedQuestionsProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Sprout className="h-5 w-5" />
        <p className="text-sm font-medium">Suggested Questions</p>
      </div>
      <div className="grid gap-2">
        {questions.map((question, index) => (
          <Button
            key={index}
            variant="outline"
            className="justify-start text-left h-auto py-3 px-4"
            onClick={() => onSelect(question)}
          >
            {question}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedQuestions;
