# JSONManager
The js library to handle the Json Data update, insert and delete, export, redline the changes before saving. The Jsonmanager also validate the json object against the supplied schema and the Json Object Editor can show the inputbox, selector or checkbox per the node data type in the schema definition. 

var json = new UI.JSONManager(response);
                console.log('panels:', json.getNode('functiongroups/{"id":"bf99330c_eafc_4211_ae09_24ade30cb775"}/functions/{"id":"4337c0a1_2766_4bbc_a80f_a7e93b3fa355"}'))
                json.updateNodeValue('functiongroups/{"id":"bf99330c_eafc_4211_ae09_24ade30cb775"}/functions/{"id":"4337c0a1_2766_4bbc_a80f_a7e93b3fa355"}/inputs/{"id": "8c9b4986_5454_498e_8d6f_90c1ce041be0"}', '{"name":"test", "aliasname":"test"}')
                console.log('panels:', json.getNode('functiongroups/{"id":"bf99330c_eafc_4211_ae09_24ade30cb775"}/functions/{"id":"4337c0a1_2766_4bbc_a80f_a7e93b3fa355"}'),json.changed)
                json.deleteNode('functiongroups/{"id":"bf99330c_eafc_4211_ae09_24ade30cb775"}/functions/0')
                console.log('function:', json.getNode('functiongroups/{"id":"bf99330c_eafc_4211_ae09_24ade30cb775"}/functions/0'),json.changed)

Following image shows the redlines of the changes:
![image](https://github.com/mdaxf/JSONManager/assets/23530144/6a05f538-0cf5-4e1b-a81c-25ab85d031fb)

how to use it:
1.  You can use the JSONManager standalone for the node operating. 
2.  If you want to have the Json Object editor, you need to include the jstree.js library. 
3.  If you want to have the Json Object redlines, you need to include the CodeMirror merge view library. 
