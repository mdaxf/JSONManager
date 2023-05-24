var UI = UI || {};
(function (UI) {

    class JSONManager {
        constructor(jsonObject, options = { allowChanges: true }) {
            this.originalObject = JSON.parse(JSON.stringify(jsonObject));        
          this.data = (typeof jsonObject == 'string')? JSON.parse(jsonObject) : jsonObject;
          this.options = options;
          this.changed = false;
        }

        insertNode(path, Value) {
            if (!this.options.allowChanges) {
                console.log("Modifications are not allowed.");
                return;
            } 
            const node = this.getNode(path);
            if (node) {
                if (node.isArrayElement) {
                    node.push(Value)
                } else {
                    if(this.isValidJSON(Value)){
                        let valueobj = JSON.parse(Value);
                        for (const key in valueobj) {
                            if (valueobj.hasOwnProperty(key)) {
                                const element = valueobj[key];
                                node.value[key] = element;
                            }
                        }
                    }
                    else{
                        node.value = Value;
                    }              
                }

                this.changed = true;
            }
        }
         // {}
        updateNodeValue(path, newValue) {
          if (!this.options.allowChanges) {
            console.log("Modifications are not allowed.");
            return;
          }

          let isValueObj =this.isValidJSON(newValue);

          const node = this.getNode(path);
          if (node) {
          //  console.log('node',node)
            if (node.isArrayElement) {
              const arrayNode = this.getNode(node.arrayPath);
              if (arrayNode) {
                if(!isValueObj)
                    arrayNode[node.index] = newValue;
                else{
                    let valueobj = JSON.parse(newValue);
                    for (const key in valueobj) {
                        if (valueobj.hasOwnProperty(key)) {
                            const element = valueobj[key];
                            arrayNode.value[key] = element;
                        }
                    }
                }
              }
            } else {
                if(!isValueObj)
                    node.value = newValue;
                else{
                    let valueobj = JSON.parse(newValue);
                    for (const key in valueobj) {
                        if (valueobj.hasOwnProperty(key)) {
                            const element = valueobj[key];
                            node.value[key] = element;
                        }
                    }
                }
            }
            this.changed = true;
          } else {
            console.log("Invalid path:", path);
          }
        }

        deleteNode(path) {
            if (!this.options.allowChanges) {
                console.log("Modifications are not allowed.");
                return;
            }
            const node = this.getNode(path);
            if (node) {
                if (node.isArrayElement) {
                    const arrayNode = this.getNode(node.arrayPath);
                    if (arrayNode) {
                        arrayNode.splice(node.index, 1);
                    }  
                } else {
                    const arrayNode = this.getNode(node.arrayPath);
                    if (arrayNode) {
                        delete arrayNode[node.value];
                    }
                }
                this.changed = true;
            } else {
                console.log("Invalid path:", path);
            }
        }

        getNode(path) {
          console.log(path)
          const keys = path.includes("/")? path.split("/"): path;
          let currentNode = this.data;
          let arrayPath = null;
          let isArrayElement = false;
          let index = -1;
          console.log(keys)
          for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
           
            if(this.isValidJSON(key)){

                let keyobj = JSON.parse(key);
                let findobj = this.findNodeByKeys(currentNode, keyobj);
               
                if(findobj){
                    currentNode = findobj.value;
                    arrayPath = findobj.arrayPath;
                    isArrayElement = findobj.isArrayElement;
                    index = findobj.index;
                }
                else{
                    return null;
                }

            }
            else{
                console.log(keys,i)
                if (currentNode.hasOwnProperty(key)) {
                if (Array.isArray(currentNode)) {
                    currentNode = currentNode[key];
                    arrayPath = keys.slice(0, i).join("/");
                    isArrayElement = true;
                    index = parseInt(key);
                } else {
                    currentNode = currentNode[key];
                    isArrayElement = false;
                }
                } else {
                return null;
                }
            }
          }
      
          return {
            value: currentNode,
            isArrayElement: isArrayElement,
            arrayPath: arrayPath,
            index: index,
          };
        }

        isValidJSON(str){
            try {
                JSON.parse(str);
            } catch (e) {
                return false;
            }
            return true;
        }

        findNodeByKeys(jsonObject, criteria) {
            if(Array.isArray(jsonObject)){
                for (const key in jsonObject) {
                    if (jsonObject.hasOwnProperty(key)) {
                        const node = jsonObject[key];
                        let found = true;
                  
                        for (const searchKey in criteria) {
                          if (criteria.hasOwnProperty(searchKey) && node[searchKey] !== criteria[searchKey]) {
                            found = false;
                            break;
                          }
                        }
                  
                        if (found) {
                          return {
                            value: node,
                            isArrayElement: Array.isArray(node),
                            arrayPath: parseInt(key),
                            index: parseInt(key),
                          };
                        }
                    }
                }

            }
            else{
                let found = true;
                for (const searchKey in criteria) {
                    if (criteria.hasOwnProperty(searchKey) && jsonObject[searchKey] !== criteria[searchKey]) {
                      found = false;
                      break;
                    }
                }
                if (found) {
                    return {
                      value: jsonObject,
                      isArrayElement: false,
                      arrayPath: null,
                      index: -1,
                    };
                } 

            }
         
            return null;
          }

        ExportJSON(){          
            return JSON.stringify(this.data);
        }
    }
    UI.JSONManager = JSONManager
})(UI || (UI = {}));