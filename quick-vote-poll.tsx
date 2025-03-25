"use client"

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast, Toaster } from "sonner";

export default function QuickVotePoll() {
  const [votes, setVotes] = useState({ option1: 0, option2: 0 });
  const [lastClicked, setLastClicked] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const totalVotes = votes.option1 + votes.option2;
  const option1Percentage = totalVotes === 0 ? 0 : Math.round((votes.option1 / totalVotes) * 100);
  const option2Percentage = totalVotes === 0 ? 0 : Math.round((votes.option2 / totalVotes) * 100);

  const handleVote = (option: "option1" | "option2") => {
    setVotes((prev) => ({
      ...prev,
      [option]: prev[option] + 1,
    }));

    setLastClicked(option);
    toast.success("Your vote has been recorded!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Toaster position="top-center" />
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">Which do you prefer?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Button
              aria-label="Vote for Coffee"
              variant={lastClicked === "option1" ? "default" : "outline"}
              className={`h-12 rounded-full font-medium transition-transform duration-300 hover:scale-105 ${lastClicked === "option1" ? "scale-[0.98]" : ""}`}
              onClick={() => handleVote("option1")}
            >
              Coffee
            </Button>
            <Button
              aria-label="Vote for Tea"
              variant={lastClicked === "option2" ? "default" : "outline"}
              className={`h-12 rounded-full font-medium transition-transform duration-300 hover:scale-105 ${lastClicked === "option2" ? "scale-[0.98]" : ""}`}
              onClick={() => handleVote("option2")}
            >
              Tea
            </Button>
          </div>

          <div className="mt-6 space-y-4">
            {totalVotes === 0 && <div className="text-center text-sm text-gray-500">No votes yet</div>}

            <div className="h-10 w-full bg-gray-200 rounded-full overflow-hidden flex relative">
              {totalVotes > 0 && (
                <>
                  {option1Percentage > 0 && (
                    <div
                      className="h-full transition-all duration-500 flex items-center justify-start pl-2 text-xs text-white font-medium bg-green-500"
                      style={{ width: `${option1Percentage}%` }}
                    />
                  )}
                  {option2Percentage > 0 && (
                    <div
                      className="h-full transition-all duration-500 flex items-center justify-end pr-2 text-xs text-white font-medium bg-orange-500"
                      style={{ width: `${option2Percentage}%` }}
                    />
                  )}
                </>
              )}
            </div>

            <div className="flex justify-between text-xs font-medium mt-2">
              <span className="text-gray-700">Coffee: {option1Percentage}%</span>
              <span className="text-gray-700">Tea: {option2Percentage}%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
