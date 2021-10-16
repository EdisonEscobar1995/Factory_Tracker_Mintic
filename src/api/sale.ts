import { collection, getDocs, query, orderBy, doc, setDoc, getDoc, Timestamp, deleteDoc } from "firebase/firestore";
import { ISale } from "../Interfaces/Sale/sale";
import { db } from "../utils/firebaseConfig";

const getSales = async () => {
  const response: ISale[] = [];
  const consulta = collection(db, 'sales');
  // let resultado = await getDocs(consulta);
  let resultado = await getDocs(query(consulta, orderBy('fechaVenta', 'desc')));
  if (resultado && resultado.docs.length > 0) {
    resultado.docs.forEach((documento) => {
      return response.push({
        id: documento.id,
        estado: documento.data().estado,
        fechaVenta: documento.data().fechaVenta,
        idCliente: documento.data().idCliente,
        nombreCliente: documento.data().nombreCliente,
        valorTotal: documento.data().valorTotal,
        productos: documento.data().productos
      });
    })
  }
  return response;
};

const setSale = (sale: ISale, uid: string) => {
  let referencia = doc(db, 'sales', uid);
  const saleData = {
    ...sale,
    fechaVenta: Timestamp.fromDate(sale.fechaVenta)
  }
  debugger;
  return setDoc(referencia, saleData);
};

const getSaleById = async (uid: string) => {
  let response = null;
  if (uid) {
    const consulta = doc(db, 'sales', uid);
    let resultado = await getDoc(consulta);
    if (resultado) {
      response = resultado.data();
    }
  }
  return response;
};

const deleteSale = async (uid: string) => {
  let referencia = doc(db, 'sales', uid);
  return deleteDoc(referencia);
};

export {
  getSales,
  setSale,
  getSaleById,
  deleteSale
};
