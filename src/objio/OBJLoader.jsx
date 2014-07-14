function OBJLoader() {

  this.geometrys = [];

  this.parse = function(in_data) {

    var group = {};

    var positions = [];
    var normals = [];
    var uv = [];

    var pattern, result;

    // v float float float

    pattern = /v( +[\d|\.|\+|\-|e]+)( [\d|\.|\+|\-|e]+)( [\d|\.|\+|\-|e]+)/g;

    while ((result = pattern.exec(in_data)) !== null) {

      // ["v 1.0 2.0 3.0", "1.0", "2.0", "3.0"]

      positions.push(parseFloat(result[1]));
      positions.push(parseFloat(result[2]));
      positions.push(parseFloat(result[3]));
    }

    // vn float float float

    pattern = /vn( +[\d|\.|\+|\-|e]+)( [\d|\.|\+|\-|e]+)( [\d|\.|\+|\-|e]+)/g;

    while ((result = pattern.exec(in_data)) !== null) {

      // ["vn 1.0 2.0 3.0", "1.0", "2.0", "3.0"]

      normals.push(parseFloat(result[1]));
      normals.push(parseFloat(result[2]));
      normals.push(parseFloat(result[3]));
    }

    // vt float float

    pattern = /vt( +[\d|\.|\+|\-|e]+)( [\d|\.|\+|\-|e]+)/g;

    while ((result = pattern.exec(in_data)) !== null) {

      // ["vt 0.1 0.2", "0.1", "0.2"]

      uv.push(parseFloat(result[1]));
      uv.push(parseFloat(result[2]));
    }

    var data = in_data.split('\no ');

    for (var i = 0, l = data.length; i < l; i++) {

      var object = data[i];

      var geometry = {
        type: "geometry",
        // coreId: params.objectId + "." + i,
        positions: positions,
        uv: [],
        normals: [],
        indices: []
      };

      // f vertex vertex vertex ...

      pattern = /f( +[\d]+)( [\d]+)( [\d]+)( [\d]+)?/g;

      while ((result = pattern.exec(object)) !== null) {

        // ["f 1 2 3", "1", "2", "3", undefined]

        if (result[4] === undefined) {

          geometry.indices.push(parseInt(result[1], 10) - 1);
          geometry.indices.push(parseInt(result[2], 10) - 1);
          geometry.indices.push(parseInt(result[3], 10) - 1);


        } else {

          geometry.indices.push(parseInt(result[1], 10) - 1);
          geometry.indices.push(parseInt(result[2], 10) - 1);
          geometry.indices.push(parseInt(result[3], 10) - 1);
          geometry.indices.push(parseInt(result[4], 10) - 1);
        }
      }

      // f vertex/uv vertex/uv vertex/uv ...

      pattern = /f( +([\d]+)\/([\d]+))( ([\d]+)\/([\d]+))( ([\d]+)\/([\d]+))( ([\d]+)\/([\d]+))?/g;

      while ((result = pattern.exec(object)) !== null) {

        // ["f 1/1 2/2 3/3", " 1/1", "1", "1", " 2/2", "2", "2", " 3/3", "3", "3", undefined, undefined, undefined]

        if (result[10] === undefined) {

          geometry.indices.push(parseInt(result[2], 10) - 1);
          geometry.indices.push(parseInt(result[5], 10) - 1);
          geometry.indices.push(parseInt(result[8], 10) - 1);

          geometry.uv.push(uv[parseInt(result[3], 10) - 1]);
          geometry.uv.push(uv[parseInt(result[6], 10) - 1]);
          geometry.uv.push(uv[parseInt(result[9], 10) - 1]);

        } else {

          geometry.indices.push(parseInt(result[2], 10) - 1);
          geometry.indices.push(parseInt(result[5], 10) - 1);
          geometry.indices.push(parseInt(result[8], 10) - 1);
          geometry.indices.push(parseInt(result[11], 10) - 1);

          geometry.uv.push(uv[parseInt(result[3], 10) - 1]);
          geometry.uv.push(uv[parseInt(result[6], 10) - 1]);
          geometry.uv.push(uv[parseInt(result[9], 10) - 1]);
          geometry.uv.push(uv[parseInt(result[12], 10) - 1]);
        }
      }

      // f vertex/uv/normal vertex/uv/normal vertex/uv/normal ...

      pattern = /f( +([\d]+)\/([\d]+)\/([\d]+))( ([\d]+)\/([\d]+)\/([\d]+))( ([\d]+)\/([\d]+)\/([\d]+))( ([\d]+)\/([\d]+)\/([\d]+))?/g;

      while ((result = pattern.exec(object)) !== null) {

        // ["f 1/1/1 2/2/2 3/3/3", " 1/1/1", "1", "1", "1", " 2/2/2", "2", "2", "2", " 3/3/3", "3", "3", "3", undefined, undefined, undefined, undefined]

        if (result[13] === undefined) {

          geometry.indices.push(parseInt(result[2], 10) - 1);
          geometry.indices.push(parseInt(result[6], 10) - 1);
          geometry.indices.push(parseInt(result[10], 10) - 1);

          geometry.uv.push(uv[parseInt(result[3], 10) - 1]);
          geometry.uv.push(uv[parseInt(result[7], 10) - 1]);
          geometry.uv.push(uv[parseInt(result[11], 10) - 1]);

          geometry.normals.push(normals[parseInt(result[4], 10) - 1]);
          geometry.normals.push(normals[parseInt(result[8], 10) - 1]);
          geometry.normals.push(normals[parseInt(result[12], 10) - 1]);


        } else {

          geometry.indices.push(parseInt(result[2], 10) - 1);
          geometry.indices.push(parseInt(result[6], 10) - 1);
          geometry.indices.push(parseInt(result[10], 10) - 1);
          geometry.indices.push(parseInt(result[14], 10) - 1);

          geometry.uv.push(uv[parseInt(result[3], 10) - 1]);
          geometry.uv.push(uv[parseInt(result[7], 10) - 1]);
          geometry.uv.push(uv[parseInt(result[11], 10) - 1]);
          geometry.uv.push(uv[parseInt(result[15], 10) - 1]);

          geometry.normals.push(normals[parseInt(result[4], 10) - 1]);
          geometry.normals.push(normals[parseInt(result[8], 10) - 1]);
          geometry.normals.push(normals[parseInt(result[12], 10) - 1]);
          geometry.normals.push(normals[parseInt(result[16], 10) - 1]);

        }
      }

      // f vertex//normal vertex//normal vertex//normal ...

      pattern = /f( +([\d]+)\/\/([\d]+))( ([\d]+)\/\/([\d]+))( ([\d]+)\/\/([\d]+))( ([\d]+)\/\/([\d]+))?/g;

      while ((result = pattern.exec(object)) !== null) {

        // ["f 1//1 2//2 3//3", " 1//1", "1", "1", " 2//2", "2", "2", " 3//3", "3", "3", undefined, undefined, undefined]

        if (result[10] === undefined) {

          geometry.indices.push(parseInt(result[2], 10) - 1);
          geometry.indices.push(parseInt(result[5], 10) - 1);
          geometry.indices.push(parseInt(result[8], 10) - 1);

          geometry.normals.push(normals[parseInt(result[3], 10) - 1]);
          geometry.normals.push(normals[parseInt(result[6], 10) - 1]);
          geometry.normals.push(normals[parseInt(result[9], 10) - 1]);

        } else {

          geometry.indices.push(parseInt(result[2], 10) - 1);
          geometry.indices.push(parseInt(result[5], 10) - 1);
          geometry.indices.push(parseInt(result[8], 10) - 1);
          geometry.indices.push(parseInt(result[11], 10) - 1);

          geometry.normals.push(normals[parseInt(result[3], 10) - 1]);
          geometry.normals.push(normals[parseInt(result[6], 10) - 1]);
          geometry.normals.push(normals[parseInt(result[9], 10) - 1]);
          geometry.normals.push(normals[parseInt(result[12], 10) - 1]);
        }
      }

      this.geometrys.push(geometry);
    }
    // return positions;
  };
}