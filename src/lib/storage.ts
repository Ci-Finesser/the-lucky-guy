import  B2 from 'b2-js/dist/b2';
import { BackblazeLibraryError } from 'b2-js/dist/errors';
import { FileData, FileInfo } from 'b2-js/dist/file';

class BackblazeB2Connection {
  private client: B2 | undefined;


  constructor(credentials: { applicationKeyId: string; applicationKey: string }) {
    this.client = undefined; 
  }

  async uploadFile(
    bucketName: string,
    fileName: string,
    fileData: Uint8Array,
    options?: any
  ): Promise<any> {
    try {
      const bucket = this.client!.bucket(bucketName);
      const response = (await bucket).upload(fileName, Buffer.from(fileData), options);
      console.log(`File ${fileName} uploaded to Backblaze B2 successfully!`);
      return response;
    } catch (error) {
      console.error('Error uploading file to Backblaze B2:', error);
      throw error;
    }
  }

  async downloadFile(bucketName: string, fileName: string): Promise<NodeJS.ReadableStream> {
    try {
      const bucket = this.client!.bucket(bucketName);
      const file = (await bucket).file(fileName);
      const stream = file.createReadStream();
      console.log(`File ${fileName} downloaded from Backblaze B2 successfully!`);
      return stream;
    } catch (error) {
      console.error('Error downloading file from Backblaze B2:', error);
      throw error;
    }
  }

  async getFileInfoById(bucketName: string, fileId: string): Promise<FileData> {
    try {
      const bucket = this.client!.bucket(bucketName);
      const file = (await bucket).file(fileId);
      const fileData = await file.stat();
      return fileData;
    } catch (error) {
      console.error('Error getting file info from Backblaze B2:', error);
      throw error;
    }
  }

  async getFileInfoByName(bucketName: string, fileName: string): Promise<FileData> {
    try {
      const bucket = this.client!.bucket(bucketName);
      const file = (await bucket).file(fileName);
      const fileData = await file.stat();
      return fileData;
    } catch (error) {
      if (error instanceof BackblazeLibraryError.FileNotFound) {
        console.error('File not found in Backblaze B2:', error);
      } else {
        console.error('Error getting file info from Backblaze B2:', error);
      }
      throw error;
    }
  }
}

// Usage Example:
const b2Credentials = {
  applicationKeyId: "00352c3e3a790110000000001",
  applicationKey: "K0036kgXToujsOAbq5LlYXvEy4Gg8sU"
};

const b2Connection = new BackblazeB2Connection(b2Credentials);

export default BackblazeB2Connection;
