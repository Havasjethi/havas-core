
export interface ProcessedCallable {
  name: string; // Only req. for simplicity, No mem ref for method location
  pre_processors: ArgumentPreProcessor[];
  post_processors?: ArgumentPreProcessor[];
}

export interface ArgumentPreProcessor {
  name: string;
  index: number;
  arguments?: any;
}
