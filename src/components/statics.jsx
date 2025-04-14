import React, { useMemo } from "react";
import { Chart } from "react-chartjs-2";
import "chart.js/auto";
import { useProductContext } from "../context/productsContext.jsx"; 
import { useClientContext } from "../context/clientProvider"; 
import { useInvoiceHistoryContext } from "../context/InvoicesProvider"; 
import { PieGrafic } from "./pie.jsx"; 

const SalesStatics = () => {
    const { products } = useProductContext(); 
    const { clientes } = useClientContext(); 
    const { invoices } = useInvoiceHistoryContext(); 

    const formatDate = (rawDate) => {
        const [year, day, month] = rawDate.split("-");
        return `${year}-${month.slice(0,2)}-${day}`;
    };

    const getCurrentMonthSales = () => {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        return invoices
            .filter((invoice) => {
                const formattedDate = formatDate(invoice.fecha);
                const invoiceDate = new Date(formattedDate);
                return (
                    invoiceDate.getMonth() === currentMonth &&
                    invoiceDate.getFullYear() === currentYear
                );
            })
            .reduce((sum, invoice) => sum + invoice.total, 0);
    };

    const monthlySales = useMemo(() => getCurrentMonthSales(), [invoices]);

    const mostSoldProducts = useMemo(() => {
        const productSales = products.map((product) => {
            const totalSales = invoices.reduce((acc, invoice) => {
                const soldProduct = product.id === invoice.producto_id ? invoice.cantidad : 0 ;
                return acc + soldProduct;
            }, 0);
            return { name: product.nombre, sales: totalSales };
        });
        return productSales.sort((a, b) => b.sales - a.sales).slice(0, 5);
    }, [products, invoices]);

    const debtors = useMemo(() => {
        return clientes
            .filter((client) => invoices.some((inv) => inv.cliente_id === client.id && inv.estado !== "Pagada"))
            .map((client) => ({
                id: client.id,
                name: client.nombre,
                amount: invoices
                    .filter((inv) => inv.cliente_id === client.id && inv.estado !== "pagada")
                    .reduce((acc, inv) => acc + parseFloat(inv.total), 0),
                daysPending: invoices
                    .filter((inv) => inv.cliente_id === client.id && inv.estado !== "pagada")
                    .reduce((acc, inv) => {
                        const invoiceDate = new Date(formatDate(inv.fecha));
                        const currentDate = new Date();
                        const diffInMs = Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) -
                                            Date.UTC(invoiceDate.getFullYear(), invoiceDate.getMonth(), invoiceDate.getDate());
                        const daysDiff = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
                        return Math.max(acc, daysDiff);
                    },0),
            }))
            .sort((a, b) => b.daysPending - a.daysPending)
            .slice(0, 5);
    }, [clientes, invoices]);

    const topClients = useMemo(() => {
        return clientes.map((client) => ({
            id: client.id,
            name: client.nombre,
            totalPurchases: invoices
                .filter((inv) => inv.cliente_id === client.id)
                .reduce((acc, inv) => acc + parseFloat(inv.total), 0),
            orders: invoices.filter((inv) => inv.cliente_id === client.id).length,
        }))
        .sort((a, b) => b.totalPurchases - a.totalPurchases)
        .slice(0, 5);
    }, [clientes, invoices]);

    return (
        <div className="lg:ml-64  bg-gray-100 min-h-screen font-sans">
            <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-3xl p-12">
                <h2 className="text-4xl font-extrabold mb-14 text-center text-gray-900 tracking-wide uppercase">
                    Sales Dashboard
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-blue-700 text-white rounded-2xl p-6 shadow-md text-center">
                        <h3 className="text-base font-semibold mb-2 tracking-wide uppercase">
                            Total Sales
                        </h3>
                        <span className="text-3xl font-bold">
                            ${invoices.reduce((acc, invoice) => acc + parseFloat(invoice.total), 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                        </span>
                    </div>
                    <div className="bg-green-700 text-white rounded-2xl p-6 shadow-md text-center">
                        <h3 className="text-base font-semibold mb-2 tracking-wide uppercase">
                            Monthly Revenue
                        </h3>
                        <p className="text-3xl font-bold">
                            ${parseFloat(monthlySales).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                        </p>
                    </div>
                    <div className="bg-yellow-600 text-white rounded-2xl p-6 shadow-md text-center">
                        <h3 className="text-base font-semibold mb-2 tracking-wide uppercase">
                            Pending Payments
                        </h3>
                        <p className="text-3xl font-bold">
                            {invoices.filter((inv) => inv.estado !== "Pagada").length} Invoices
                        </p>
                    </div>
                </div>

                <section className="mb-16">
                    <h3 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">
                        Most Sold Products
                    </h3>
                    <div className="bg-gray-50 rounded-xl p-6 shadow-inner">
                        <PieGrafic mostSoldProducts={mostSoldProducts} />
                    </div>
                </section>

                <section className="mb-16">
                    <h3 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">
                        Debtors
                    </h3>
                    <div className="overflow-x-auto bg-white rounded-xl shadow-sm border">
                        <table className="w-full text-sm text-gray-700">
                            <thead>
                                <tr className="bg-gray-200 text-gray-700 text-xs uppercase tracking-wider">
                                    <th className="px-6 py-4 text-left">Client</th>
                                    <th className="px-6 py-4 text-left">Debt Amount</th>
                                    <th className="px-6 py-4 text-left">Days Pending</th>
                                </tr>
                            </thead>
                            <tbody>
                                {debtors.map((debtor) => (
                                    <tr key={debtor.id} className="border-t hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium">{debtor.name}</td>
                                        <td className="px-6 py-4">${debtor.amount.toFixed(2)}</td>
                                        <td className="px-6 py-4">{debtor.daysPending} days</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section>
                    <h3 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">
                        Top Clients
                    </h3>
                    <div className="overflow-x-auto bg-white rounded-xl shadow-sm border">
                        <table className="w-full text-sm text-gray-700">
                            <thead>
                                <tr className="bg-gray-200 text-gray-700 text-xs uppercase tracking-wider">
                                    <th className="px-6 py-4 text-left">Client</th>
                                    <th className="px-6 py-4 text-left">Total Purchases</th>
                                    <th className="px-6 py-4 text-left">Number of Orders</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topClients.map((client) => (
                                    <tr key={client.id} className="border-t hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium">{client.name}</td>
                                        <td className="px-6 py-4">${client.totalPurchases.toFixed(2)}</td>
                                        <td className="px-6 py-4">{client.orders}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default SalesStatics;