const fs = require('fs');

class Contenedor {

    constructor ( archivo ) {

        this.archivo = archivo

    }

    async save( object ) {

        try {

            const data = await fs.promises.readFile( `./${this.archivo}`, 'utf-8' );

            const dataToJson = JSON.parse( data );

            let lastId;

            if ( dataToJson != "" ) {

                lastId = dataToJson[ dataToJson.length - 1 ].id;

            } else { 

                lastId = 0;

            }

            object.id = lastId + 1;

            dataToJson.push( object );

            await fs.promises.writeFile( `./${this.archivo}`, JSON.stringify( dataToJson, null, 2 ) );

            console.log('Done!');

            return object.id;
            
        } catch (error) {

            console.log(error);
            
        }

    }

    async getById( id ) {

        try {

            const data = await fs.promises.readFile( `./${this.archivo}`, 'utf-8' );

            const dataToJson = JSON.parse( data );

            const objectToFind = dataToJson.find(element => {
    
                return element.id == id;
              
            });

            if ( objectToFind != undefined ) {

                return objectToFind;

            } else {

                return null;

            }
            
        } catch (error) {
            
            console.log(error);

        }

    }

    async getAll() {

        let array = [];

        try {

            const data = await fs.promises.readFile( `./${this.archivo}`, 'utf-8' );

            const dataToJson = JSON.parse( data );

            dataToJson.forEach(element => {
                
                array.push( element );

            });

            return array;
            
        } catch (error) {
            
            console.log(error);

        }

    }

    async deleteById( id ) {

        const data = await fs.promises.readFile( `./${this.archivo}`, 'utf-8' );

        const dataToJson = JSON.parse( data );

        const objectToFind = dataToJson.filter(element => 
    
            element.id != id
              
        );

        await fs.promises.writeFile( `./${this.archivo}`, JSON.stringify( objectToFind, null, 2 ) );

    }

    async deleteAll() {

        await fs.promises.writeFile( `./${this.archivo}`, "[]" );

    }

}

//const cont = new Contenedor( './productos.txt' );

//cont.save( { 'tittle': 'Libro', 'price': 500, 'thumbnail': 'https://asd.com/2.png' } );

//cont.getById( 3 );

//cont.getAll();

//cont.deleteById( 2 );

//cont.deleteAll();

module.exports = Contenedor;