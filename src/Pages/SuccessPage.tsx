import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import useAuth from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '@/Components/ui-components/Button';

const SuccessPage = () => {
  const [invoiceData, setInvoiceData] = useState([]);
  const {user, isAuthenticated , isLoading} = useAuth()

  useEffect(() => {
    const invoiceDataFromCart = JSON.parse(localStorage.getItem('invoiceData'));
    setInvoiceData(invoiceDataFromCart || []);
  }, []);

  const price = Number(invoiceData.reduce((acc, item) => acc + item.price*item.quantity, 0).toFixed(3))
  const tax = ((price*18)/100)
  const total = (price + tax)

  // console.log(typeof(total));
  
  const handleDownloadInvoice = () => {
    if (invoiceData.length > 0) {
      const invoiceElement = document.getElementById('invoice-table');
      html2canvas(invoiceElement).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgWidth = 190;
        const pageHeight = pdf.internal.pageSize.height;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save('invoice.pdf');
      });

    } else {
      alert('No invoice data found!');
    }
  };

  const navigate = useNavigate()

  if(isLoading){
    return(
        <div className='flex justify-center items-center h-[100vh]'>
          <svg className='w-80 flex justify-center items-center' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="none" stroke-opacity="1" stroke="#bff3ff" stroke-width=".5" cx="100" cy="100" r="0"><animate attributeName="r" calcMode="spline" dur="2" values="1;80" keyTimes="0;1" keySplines="0 .2 .5 1" repeatCount="indefinite"></animate><animate attributeName="stroke-width" calcMode="spline" dur="2" values="0;25" keyTimes="0;1" keySplines="0 .2 .5 1" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" calcMode="spline" dur="2" values="1;0" keyTimes="0;1" keySplines="0 .2 .5 1" repeatCount="indefinite"></animate></circle></svg>
        </div>
    )
  }

  if(!isAuthenticated){
    return(
        <div className='flex flex-col justify-center items-center h-[100vh]'>
            <div className=' font-bold text-7xl text-center'>ERROR 404</div>
            <p className='text-xl pt-3'>Page not found</p>
            <button className='pt-5' onClick={()=>{navigate(-1)}}><PrimaryButton btnName = {'Go Back'}/></button>
        </div>
    )
}

  if(user){
      return (
          <div className='flex flex-col py-10 items-center w-full'>
      <h1 className="text-3xl font-bold mb-4">Thank you for your purchase!</h1>
      <p className="text-lg mb-8">Your order has been successfully processed.</p>
      {invoiceData.length>0?
      <div id="invoice-table" className="bg-blue-200 p-4 rounded">
        <h1 className="text-2xl font-bold mb-2">Invoice</h1>
        <table className="w-full border-collapse border border-blue-500">
          <thead>
            <tr>
              <th className="bg-blue-500 text-white p-2">Item</th>
              <th className="bg-blue-500 text-white p-2">Quantity</th>
              <th className="bg-blue-500 text-white p-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.map((item) => (
                <tr key={item.title}>
                <td className="border border-blue-500 p-2">{item.title}</td>
                <td className="border border-blue-500 p-2">{item.quantity}</td>
                <td className="border border-blue-500 p-2">${item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='mt-5'>
          <p>Tax(18%): ${tax.toFixed(3)}</p>
          <p>shipping: $20</p>
        </div>
        <p className="text-lg font-bold mt-4">Total: ${total.toFixed(3)}</p>
      </div>
        :''}
      <div className=' flex space-x-5 pt-5'>
        <button
          onClick={handleDownloadInvoice}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${invoiceData.length>0?'block':'hidden'}`}
          >
          Download
        </button>
        <button onClick={()=>{
            window.location.href = '/'; 
            localStorage.removeItem('invoiceData');
        }} 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Home</button>
      </div>
    </div>
  );
};
}

export default SuccessPage;