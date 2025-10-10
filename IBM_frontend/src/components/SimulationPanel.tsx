import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { PlayCircle, RotateCcw } from "lucide-react";

interface SimulationResult {
  baselineEnergy: number;
  simulatedEnergy: number;
  energySavings: number;
  baselinePUE: number;
  simulatedPUE: number;
  pueSavings: number;
}

export const SimulationPanel = () => {
  const [efficiency, setEfficiency] = useState([10]);
  const [cooling, setCooling] = useState([5]);
  const [result, setResult] = useState<SimulationResult | null>(null);

  const runSimulation = () => {
    const baselineEnergy = 1000;
    const baselinePUE = 1.6;
    
    const simulatedEnergy = baselineEnergy * (1 - efficiency[0] / 100);
    const simulatedPUE = baselinePUE - (cooling[0] * 0.05);
    
    setResult({
      baselineEnergy,
      simulatedEnergy,
      energySavings: ((baselineEnergy - simulatedEnergy) / baselineEnergy) * 100,
      baselinePUE,
      simulatedPUE,
      pueSavings: ((baselinePUE - simulatedPUE) / baselinePUE) * 100,
    });
  };

  const reset = () => {
    setEfficiency([10]);
    setCooling([5]);
    setResult(null);
  };

  return (
    <Card className="p-6 border-2 border-secondary/20 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-foreground mb-1">What-If Simulation</h3>
        <p className="text-muted-foreground text-sm">Test optimization scenarios before implementation</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-foreground">Efficiency Improvement</label>
            <span className="text-primary font-bold">{efficiency[0]}%</span>
          </div>
          <Slider
            value={efficiency}
            onValueChange={setEfficiency}
            max={50}
            step={1}
            className="w-full"
          />
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-foreground">Cooling Optimization</label>
            <span className="text-primary font-bold">{cooling[0]} units</span>
          </div>
          <Slider
            value={cooling}
            onValueChange={setCooling}
            max={20}
            step={1}
            className="w-full"
          />
        </div>

        <div className="flex gap-3">
          <Button onClick={runSimulation} className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
            <PlayCircle className="mr-2" size={18} />
            Run Simulation
          </Button>
          <Button onClick={reset} variant="outline" className="border-border hover:bg-muted">
            <RotateCcw size={18} />
          </Button>
        </div>

        {result && (
          <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border space-y-3 animate-fade-in">
            <h4 className="font-semibold text-foreground text-sm uppercase tracking-wide">Results</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Energy Consumption</p>
                <p className="text-2xl font-bold text-foreground">{result.simulatedEnergy.toFixed(0)}</p>
                <p className="text-xs text-success">↓ {result.energySavings.toFixed(1)}% savings</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">PUE Score</p>
                <p className="text-2xl font-bold text-foreground">{result.simulatedPUE.toFixed(2)}</p>
                <p className="text-xs text-success">↓ {result.pueSavings.toFixed(1)}% improvement</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
