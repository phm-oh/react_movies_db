// generateLargeArray.js



function* createLargeArray(totalSize) {
    const chunkSize = 1000; // ปรับขนาดของ chunk ตามที่คุณต้องการ
    for (let i = 0; i < totalSize; i += chunkSize) {
      const chunk = new Array(Math.min(chunkSize, totalSize - i)).fill(0);
      yield chunk;
    }
  }
  
  // eslint-disable-next-line no-undef
  module.exports = createLargeArray;
  