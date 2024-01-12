// generateLargeArray.d.ts
declare module '../Fx/generateLargeArray' {
    function createLargeArray(totalSize: number): Generator<number[], void, unknown>;
    export default createLargeArray;
  }
  
  