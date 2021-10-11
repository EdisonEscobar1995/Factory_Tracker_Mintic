import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { IProduct } from "../Interfaces/product";
import { db } from "../utils/firebaseConfig";

const getProducts = async () => {
  const response: IProduct[] = [];
  const consulta = collection(db, 'products');
  let resultado = await getDocs(consulta);
  if (resultado && resultado.docs.length > 0) {
    resultado.docs.forEach(documento => {
      response.push({
        id: documento.id,
        codigo: documento.data().codigo,
        descripcion: documento.data().descripcion,
        valorUnitario: documento.data().valorUnitario,
        estado: documento.data().estado
      });
    })
  }
  return response;
};

const getProductById = async (uid: string) => {
  let response = null;
  if (uid) {
    const consulta = doc(db, 'products', uid);
    let resultado = await getDoc(consulta);
    if (resultado) {
      response = resultado.data();
    }
  }
  return response;
};

const updateProduct = async (product: IProduct, uid: string) => {
  // if (uid) {
    let referencia = doc(db, 'products', uid);
    return setDoc(referencia, product);
  // }
  // return false;
};

const deleteProduct = async (uid: string) => {
  let referencia = doc(db, 'products', uid);
  return deleteDoc(referencia);
};

export {
  getProductById,
  getProducts,
  updateProduct,
  deleteProduct
};
