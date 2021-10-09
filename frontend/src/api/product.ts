import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { IProduct } from "../Interfaces/product";
import { db } from "../utils/firebaseConfig";

const getProducts = async () => {
  const response: IProduct[] = [];
  const consulta = collection(db, 'products');
  let resultado = await getDocs(consulta);
  if (resultado && resultado.docs.length > 0) {
    resultado.docs.forEach(documento => {
      console.log('proudcto.id = ', documento.id);
      console.log('proudcto = ', documento.data());
      response.push({
        id: documento.id,
        descripcion: documento.data().descripcion,
        valorUnitario: documento.data().valorUnitario,
        estado: documento.data().estado
      });
    })
  }
  return response;
};

const getProductById = async (uid: string) => {
  const consulta = doc(db, 'users', uid);
  let resultado = await getDoc(consulta);
  console.log('producto == ', resultado);
  console.log('producto.data == ', resultado.data());
  return resultado.data();
};

// const updateProduct = async (product: IProduct) => {
  const updateProduct = async (uid: string) => {
  if (uid) {
    const dataUser: IProduct = {
      descripcion: 'Camiseta editada otra',
      estado:true,
      valorUnitario: 21000
    };
    let referencia = doc(db, 'products', uid);
    return setDoc(referencia, dataUser);
  }
  return false;
};

export {
  getProductById,
  getProducts,
  updateProduct
};
