// import React, { useState, useEffect } from 'react';
// import { NavigationBar, Header, MobileAdminNavbar } from "../layout";
// import { ConfirmModal, CustomButton } from '../../components';
// import { Table, Button, Modal, Form, message, Select } from 'antd';
// import axios from 'axios';

// const AdminItemSettings = () => {
//   const [isNavCollapsed, setIsNavCollapsed] = useState(false);
//   const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
//   const [productData, setProductData] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isConfirmOpen, setIsConfirmOpen] = useState(false);
//   const [selectedProductId, setSelectedProductId] = useState(null);
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [form] = Form.useForm();

//   const toggleNav = () => {
//     if (window.innerWidth <= 768) {
//       setIsMobileNavOpen(!isMobileNavOpen);
//     } else {
//       setIsNavCollapsed(!isNavCollapsed);
//     }
//   };

//   useEffect(() => {
//     fetchProductData();
//   }, []);

//   const fetchProductData = async () => {
//     try {
//       const res = await axios.get('https://online-shop-server-1.onrender.com/api/product-maintenance');
//       setProductData(Array.isArray(res.data) ? res.data : []); // Ensure it's an array
//     } catch (error) {
//       message.error("Failed to fetch data");
//       setProductData([]); // Set to an empty array on failure
//     }
//   };

//   const handleAddOrEdit = async (values) => {
//     try {
//       if (editingProduct) {
//         await axios.put(`https://online-shop-server-1.onrender.com/api/admin-product-maintenance/${editingProduct._id}`, values);
//         message.success("Product updated successfully");
//       } else {
//         await axios.post('https://online-shop-server-1.onrender.com/api/adminadd-product-maintenance', values);
//         message.success("Product added successfully");
//       }
//       setIsModalOpen(false);
//       fetchProductData();
//       form.resetFields();
//       setEditingProduct(null);
//     } catch (error) {
//       message.error("Operation failed");
//     }
//   };

//   const confirmDelete = (id) => {
//     setSelectedProductId(id);
//     setIsConfirmOpen(true);
//   };

//   const handleDelete = async () => {
//     try {
//       await axios.delete(`https://online-shop-server-1.onrender.com/api/admin-product-maintenance/${selectedProductId}`);
//       message.success("Product deleted successfully");
//       fetchProductData();
//     } catch (error) {
//       message.error("Delete failed");
//     } finally {
//       setIsConfirmOpen(false);
//       setSelectedProductId(null);
//     }
//   };

//   const columns = [
//     {
//       title: 'Category',
//       dataIndex: 'category',
//       key: 'category',
//       render: (categories) => (Array.isArray(categories) ? categories.join(", ") : categories),
//     },
//     {
//       title: 'Sub-Category',
//       dataIndex: 'subCategory',
//       key: 'subCategory',
//       render: (subCategories) => (Array.isArray(subCategories) ? subCategories.join(", ") : subCategories),
//     },
//     {
//       title: 'Brand',
//       dataIndex: 'brand',
//       key: 'brand',
//       render: (brands) => (Array.isArray(brands) ? brands.join(", ") : brands),
//     },
//     {
//       title: 'Color',
//       dataIndex: 'color',
//       key: 'color',
//       render: (colors) => (Array.isArray(colors) ? colors.join(", ") : colors),
//     },
//     {
//       title: 'Sizes',
//       dataIndex: 'sizes',
//       key: 'sizes',
//       render: (sizes) => (Array.isArray(sizes) ? sizes.join(", ") : sizes),
//     },
//     {
//       title: 'Actions',
//       render: (_, record) => (
//         <>
//           <Button onClick={() => {
//             setEditingProduct(record);
//             form.setFieldsValue(record);
//             setIsModalOpen(true);
//           }}>Edit</Button>
//           <Button onClick={() => confirmDelete(record._id)} danger>Delete</Button>
//         </>
//       ),
//     },
//   ];

//   return (
//     <div className={`flex flex-row-reverse max-md:flex-row w-full`}>
//       <div className='flex flex-col flex-1 h-screen'>
//         <Header toggleNav={toggleNav} />
//         <MobileAdminNavbar isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
//         <div className='flex-1 overflow-auto mt-14 bg-[#EFEFEF] p-4'>
//           <div className='w-1/3 max-md:w-full'>
//             <CustomButton
//               nameButton="Add New"
//               rounded="rounded-lg"
//               color="bg-black"
//               hoverButton="hover:bg-[#454545]"
//               onClick={() => { setIsModalOpen(true); form.resetFields(); setEditingProduct(null); }}
//             />
//           </div>

//           <div className='max-md:w-[100vw] bg-white mt-2 rounded-xl max-md:overflow-x-auto max-md:whitespace-nowrap'>
//             <Table dataSource={productData} columns={columns} rowKey="_id" className="mt-4" />
//           </div>

//         </div>
//       </div>
//       <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
//         <NavigationBar isNavCollapsed={isNavCollapsed} />
//       </nav>

//       <Modal title={editingProduct ? "Edit Product" : "Add Product"} open={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={() => form.submit()}>
//         <Form form={form} layout="vertical" onFinish={handleAddOrEdit}>
//           <Form.Item label="Category" name="category" rules={[{ required: true, message: "Category is required" }]}>
//             <Select mode="tags" placeholder="Enter categories (press enter after each)">
//               {/* Users can input multiple categories */}
//             </Select>
//           </Form.Item>

//           <Form.Item label="Sub-Category" name="subCategory">
//             <Select mode="tags" placeholder="Enter sub-categories (press enter after each)">
//               {/* Users can input multiple sub-categories */}
//             </Select>
//           </Form.Item>

//           <Form.Item label="Brand" name="brand">
//             <Select mode="tags" placeholder="Enter brands (press enter after each)">
//               {/* Users can input multiple brands */}
//             </Select>
//           </Form.Item>

//           <Form.Item label="Color" name="color">
//             <Select mode="tags" placeholder="Enter colors (press enter after each)">
//               {/* Users can input multiple colors */}
//             </Select>
//           </Form.Item>

//           <Form.Item label="Sizes" name="sizes">
//             <Select mode="tags" placeholder="Enter sizes (press enter after each)">
//               {/* Users can input multiple sizes */}
//             </Select>
//           </Form.Item>

//         </Form>
//       </Modal>

//       {/* Custom Confirmation Modal */}
//       <ConfirmModal
//         isOpen={isConfirmOpen}
//         onClose={() => setIsConfirmOpen(false)}
//         onConfirm={handleDelete}
//         message="Are you sure you want to delete this product? This action cannot be undone."
//       />
//     </div>
//   );
// };

// export default AdminItemSettings;

import React, { useState, useEffect } from 'react';
import { NavigationBar, Header, MobileAdminNavbar } from "../layout";
import { ConfirmModal, CustomButton } from '../../components';
import { Table, Button, Modal, Form, message, Input, Select } from 'antd'; // Add Select here
import axios from 'axios';

const AdminItemSettings = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [productData, setProductData] = useState([]);
  const [products, setProducts] = useState([]); // ADD: to store existing products
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [categoryExists, setCategoryExists] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchProductData();
    fetchProducts(); // ADD: fetch the products list
  }, []);

  const fetchProductData = async () => {
    try {
      const res = await axios.get('https://online-shop-server-1.onrender.com/api/product-maintenance');
      setProductData(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      message.error("Failed to fetch product maintenance data");
      setProductData([]);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get('https://online-shop-server-1.onrender.com/api/products');
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      message.error("Failed to fetch products data");
      setProducts([]);
    }
  };

  const handleAddOrEdit = async (values) => {
    try {
      // Check if the category already exists
      // const categoryCheckRes = await axios.get('https://online-shop-server-1.onrender.com/api/check-category', {
      //   params: { category: values.category }
      // });
      const categoryCheckRes = await axios.get('https://online-shop-server-1.onrender.com/api/check-category', {
        params: {
          category: values.category,
          excludeId: editingProduct?._id || "",  // ✅ exclude the current editing product
        }
      });

      if (categoryCheckRes.data.exists) {
        setCategoryExists(true);  // Set the state to show the error message
        return;  // Prevent form submission
      }

      setCategoryExists(false);  // Clear error message if category does not exist

      let payload = { ...values };

      if (!editingProduct) {
        const randomID = `P-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
        payload.productID = randomID;
      }

      if (editingProduct) {
        await axios.put(`https://online-shop-server-1.onrender.com/api/admin-product-maintenance/${editingProduct._id}`, payload);
        message.success("Product updated successfully");
      } else {
        await axios.post('https://online-shop-server-1.onrender.com/api/adminadd-product-maintenance', payload);
        message.success("Product added successfully");
      }

      setIsModalOpen(false);
      fetchProductData();
      form.resetFields();
      setEditingProduct(null);
    } catch (error) {
      console.error(error);
      message.error("Operation failed");
    }
  };

  const confirmDelete = (id) => {
    setSelectedProductId(id);
    setIsConfirmOpen(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://online-shop-server-1.onrender.com/api/admin-product-maintenance/${selectedProductId}`);
      message.success("Product deleted successfully");
      fetchProductData();
    } catch (error) {
      message.error("Delete failed");
    } finally {
      setIsConfirmOpen(false);
      setSelectedProductId(null);
    }
  };

  // 👉 Function to check if the productID exists in products
  const isProductExist = (productID) => {
    return products.some(product => product.productID === productID);
  };

  const columns = [
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category) => (typeof category === 'string' ? category : category.join(", ")),
    },
    {
      title: 'Sub-Category',
      dataIndex: 'subCategory',
      key: 'subCategory',
      render: (subCategories) => (Array.isArray(subCategories) ? subCategories.join(", ") : subCategories),
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
      render: (brands) => (Array.isArray(brands) ? brands.join(", ") : brands),
    },
    {
      title: 'Color',
      dataIndex: 'color',
      key: 'color',
      render: (colors) => (Array.isArray(colors) ? colors.join(", ") : colors),
    },
    {
      title: 'Sizes',
      dataIndex: 'sizes',
      key: 'sizes',
      render: (sizes) => (Array.isArray(sizes) ? sizes.join(", ") : sizes),
    },
    {
      title: 'Actions',
      render: (_, record) => (
        <>
          <Button onClick={() => {
            setEditingProduct(record);
            form.setFieldsValue(record);
            setIsModalOpen(true);
          }}>
            Edit
          </Button>

          {/* 👉 Hide Delete if product exists */}
          {!isProductExist(record.productID) && (
            <Button onClick={() => confirmDelete(record._id)} danger style={{ marginLeft: 8 }}>
              Delete
            </Button>
          )}
        </>
      ),
    },
  ];

  const toggleNav = () => {
    if (window.innerWidth <= 768) {
      setIsMobileNavOpen(!isMobileNavOpen);
    } else {
      setIsNavCollapsed(!isNavCollapsed);
    }
  };

  return (
    <div className={`flex flex-row-reverse max-md:flex-row w-full`}>
      <div className='flex flex-col flex-1 h-screen'>
        <Header toggleNav={toggleNav} />
        <MobileAdminNavbar isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
        <div className='flex-1 overflow-auto mt-14 bg-[#EFEFEF] md:p-4'>
          <div className='w-1/3 mb-5 max-md:w-full'>
            <CustomButton
              nameButton="Add New"
              rounded="rounded-lg"
              color="bg-black"
              hoverButton="hover:bg-[#454545]"
              onClick={() => { setIsModalOpen(true); form.resetFields(); setEditingProduct(null); }}
            />
          </div>

          <div className='max-md:w-[100vw] bg-white mt-2 rounded-xl max-md:overflow-x-auto whitespace-nowrap'>
            <Table dataSource={productData} columns={columns} rowKey="_id" className="mt-4" />
          </div>
        </div>
      </div>

      <nav className={`max-md:hidden ${isNavCollapsed ? "w-20" : "w-56"} transition-width duration-300`}>
        <NavigationBar isNavCollapsed={isNavCollapsed} />
      </nav>

      <Modal
        title={editingProduct ? "Edit Product" : "Add Product"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleAddOrEdit}>
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Category is required" }]}
            help={categoryExists ? "Category already exists" : ""}
            validateStatus={categoryExists ? "error" : ""}
          >
            <Input placeholder="Enter category" />
          </Form.Item>

          <Form.Item label="Sub-Category" name="subCategory">
            <Select mode="tags" placeholder="Enter sub-categories (press enter after each)" />
          </Form.Item>

          <Form.Item label="Brand" name="brand">
            <Select mode="tags" placeholder="Enter brands (press enter after each)" />
          </Form.Item>

          <Form.Item label="Color" name="color">
            <Select mode="tags" placeholder="Enter colors (press enter after each)" />
          </Form.Item>

          <Form.Item label="Sizes" name="sizes">
            <Select mode="tags" placeholder="Enter sizes (press enter after each)" />
          </Form.Item>
        </Form>
      </Modal>

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this product? This action cannot be undone."
      />
    </div>
  );
};

export default AdminItemSettings;