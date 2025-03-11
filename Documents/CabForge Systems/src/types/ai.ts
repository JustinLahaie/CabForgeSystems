export interface AIRule {
  id: string;
  name: string;
  description: string;
  priority: number;
  condition: string;
  action: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AIRuleSet {
  id: string;
  name: string;
  description: string;
  rules: AIRule[];
  isActive: boolean;
}

export interface AIRuleExecutionContext {
  input: any;
  variables: Record<string, any>;
  timestamp: Date;
}

export interface AIRuleExecutionResult {
  success: boolean;
  ruleId: string;
  output: any;
  executedAt: Date;
  error?: string;
} 