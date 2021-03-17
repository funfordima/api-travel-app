import { Collection, Db, MongoClient, InsertOneWriteOpResult, DeleteWriteOpResultObject } from 'mongodb';

export class MongoController {
  dbName: string;
  URL: string;
  static instance: any;
  client: MongoClient;

  constructor() {
    this.dbName = 'travel-app';
    this.URL = `mongodb+srv://admin:qwerty123@cluster0.zasbp.mongodb.net/${this.dbName}?retryWrites=true&w=majority`;

    if (!MongoController.instance) {
      MongoController.instance = this;
    }

    return MongoController.instance;
  }

  async getMongoInstance(): Promise<Db> {
    try {
      if (!this.client) {
        this.client = await MongoClient.connect(this.URL, { useUnifiedTopology: true });
      }
      
      return this.client.db(this.dbName);
    } catch (e) {
      throw new Error(e);
    }
  }

  async getCollection(collectionName: string): Promise<Collection> {
    try {
      const db = await this.getMongoInstance();
      const collection = db.collection(collectionName);

      return collection;
    } catch (err) {
      throw new Error(err);
    }
  }

  async listAll(collectionName: string): Promise<any[]> {
    const collection = await this.getCollection(collectionName);

    return collection.find({}).toArray();
  }

  async getById(collectionName: string, id: string): Promise<any[]> {
    const collection = await this.getCollection(collectionName);

    return collection.findOne({ id });
  }

  async createItem(collectionName: string, item: any): Promise<InsertOneWriteOpResult<any>> {
    const collection = await this.getCollection(collectionName);
    const response = await collection.insertOne(item);

    return response.ops[0];
  }

  async createItems(collectionName: string, item: any): Promise<InsertOneWriteOpResult<any>> {
    const collection = await this.getCollection(collectionName);
    const response = await collection.insertMany(item);

    return response.ops[0];
  }

  async deleteItem(collectionName: string, id: string): Promise<DeleteWriteOpResultObject> {
    const collection = await this.getCollection(collectionName);

    return collection.deleteOne({ id });
  }

  async updateItem(collectionName: string, item: any): Promise<InsertOneWriteOpResult<any>> {
    const collection = await this.getCollection(collectionName);
  
    const id = item.id;
  
    const response = await collection.replaceOne({ id }, item);
  
    return response.ops[0];
  }
}
