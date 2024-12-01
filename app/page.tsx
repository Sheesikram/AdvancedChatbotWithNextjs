"use client";

import { useState } from "react";
import { Upload, Search, FileText, Clock, Bot, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import LoadingDots from "@/components/loading-dots";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmbedding, setIsEmbedding] = useState(false);
  const [response, setResponse] = useState("");
  const [documents, setDocuments] = useState<string[]>([]);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleEmbedding = async () => {
    setIsEmbedding(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:8000/embed", { 
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Failed to process documents");
      }

      toast({
        title: "Success",
        description: "Documents processed successfully",
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to process documents";
      setError(message);
      toast({
        variant: "destructive",
        title: "Error",
        description: message,
      });
    }
    setIsEmbedding(false);
  };

  const handleQuestion = async () => {
    if (!question.trim()) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:8000/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Failed to get response");
      }

      const data = await res.json();
      setResponse(data.answer);
      setResponseTime(data.response_time);
      setDocuments(data.documents || []);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to get response";
      setError(message);
      toast({
        variant: "destructive",
        title: "Error",
        description: message,
      });
    }
    setIsLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            AI Document Q&A Assistant
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Powered by LLaMA 3 and GROQ, this assistant helps you analyze documents and answer questions with high accuracy.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-[2fr,1fr]">
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex gap-4 mb-6">
                <Input
                  placeholder="Ask a question about your documents..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !isLoading && question.trim()) {
                      handleQuestion();
                    }
                  }}
                />
                <Button
                  onClick={handleQuestion}
                  disabled={isLoading || !question.trim()}
                  className="min-w-[120px]"
                >
                  {isLoading ? <LoadingDots /> : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Ask
                    </>
                  )}
                </Button>
              </div>

              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="min-h-[200px] bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                {response ? (
                  <div className="prose dark:prose-invert max-w-none">
                    {response}
                    {responseTime && (
                      <div className="text-sm text-gray-500 mt-4 flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        Response time: {responseTime.toFixed(2)}s
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-400">
                    <Bot className="h-12 w-12 mb-2" />
                  </div>
                )}
              </div>
            </Card>

            {documents.length > 0 && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Relevant Documents
                </h3>
                <ScrollArea className="h-[300px]">
                  {documents.map((doc, i) => (
                    <div
                      key={i}
                      className="p-4 border-b last:border-0 hover:bg-gray-50 dark:hover:bg-gray-900"
                    >
                      {doc}
                    </div>
                  ))}
                </ScrollArea>
              </Card>
            )}
          </div>

          <Card className="p-6 h-fit">
            <h3 className="text-lg font-semibold mb-4">Document Processing</h3>
            <Button
              onClick={handleEmbedding}
              disabled={isEmbedding}
              className="w-full"
              variant="outline"
            >
              {isEmbedding ? <LoadingDots /> : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Process Documents
                </>
              )}
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              Click to process and embed your documents for AI analysis.
              This step is required before asking questions.
            </p>
          </Card>
        </div>
      </div>
    </main>
  );
}