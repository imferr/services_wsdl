const express = require('express');
const soap = require('soap');
const app = express();

//definir el servicio web de soap:
const servicice = {
    CategoryService: {
        CategoryPort: {
            getCategory: function(args) {
                const categoryId = args.categoryId;
                //logica para obtener la categoria
                return { category: { categoryId, name: 'Category ${categoryId}' } };
            }
        }
    }
};

//configura el wdsl para el servicio:
const wsdlOptions = {
    attributesKey: 'attributes'
};
const wdsl = require('fs').readFileSync('category-service.wsdl', 'utf8');

//configura la ruta del servicio soap:
app.post('/categoryservice', (req, res) => {
    soap.listen(req, res, servicice, wsdl, wsdlOptions);
});

const port = 8080;
app.listen(port, () => console.log('Servicio soap en http://localhost:${port}/categoryservice?wsdl'));