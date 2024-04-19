//this service will call all the functionalities related to the product
import { Injectable, Logger  } from '@nestjs/common';
import ProductDataModel from "../product/dto/get-product-data-model.req"
import axios from "axios"
import xmlToJSON from "xml-js"
@Injectable()
export class ProductService {
 
  private logger = new Logger('Supplier Service');
 

  async fetchProductList(apiUrl: string,format: string): Promise<ProductDataModel[]> {
    // Logic to fetch product list from the supplier's API based on format (SOAP XML, JSON, CSV)
    let productList: ProductDataModel[] = [];

    if (format === 'JSON') {
      // Fetch product list in JSON format
      try {
       const response = await axios.get(apiUrl);
       productList = response?.data?.products.map((item: any) => new ProductDataModel(item.name, item.price));
      } catch (error) {
       console.error('err',error)
      }
    
    } else if (format === 'SOAP XML') {
      // Fetch product list in SOAP XML format
      try {
       const response = await axios.get(apiUrl, {
        headers: { 'Content-Type': 'text/xml' }
      })

      const data = JSON.parse(
        xmlToJSON.xml2json(response.data, { compact: true, spaces: 2 })
      );
      
      productList = data?.products.map((item: any) => new ProductDataModel(item.name, item.price));
      } catch (error) {
       console.error('err',error)
      }
   
    } else if (format === 'CSV') {
      // Fetch product list in CSV format
      try {
       const response = await axios.get("url/end/point",{ responseType: 'blob'});
       const file = response.data;
       let jsonObj1:any[] = [];
       file.text().then((csvStr) => {
        //call csvJSON function to convert string value to json object
        jsonObj1 = this.csvJSON(csvStr);
       })

       productList = jsonObj1?.map((item: any) => new ProductDataModel(item.name, item.price));
      }  catch (error) {
       console.error('err',error)
      }
    }

    return productList;
  }

  private csvJSON(csvStr){
   var lines=csvStr.split("\n");
   var result = [];
   var headers=lines[0].split(",");
 
   for(var i=1;i<lines.length;i++){
 
       var obj = {};
       var currentline=lines[i].split(",");
 
       for(var j=0;j<headers.length;j++){
           obj[headers[j]] = currentline[j];
       }
 
       result.push(obj);
 
   }
   return result; //JavaScript object
 }
}
