// return (
//     <div className="w-full h-screen flex items-center justify-center bg-white">
// <div className="flex bg-white rounded-lg shadow-lg overflow-hidden">
//   <div className="w-1/2 p-8">
//     <h3 className="font-semibold text-4xl mb-6 text-center">
//             {isRegister ? "Đăng ký" : "Đăng nhập"}
//           </h3>
//           <form>
//             {isRegister ? (
//               <>
//                 <div className="mb-4">
//                   <label
//                     className="block text-gray-700 mb-2"
//                     htmlFor="fullName"
//                   >
//                     Họ tên
//                   </label>
//                   <input
//                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                     type="text"
//                     id="fullName"
//                     placeholder="Nhập họ tên"
//                     required
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-gray-700 mb-2" htmlFor="phone">
//                     Số điện thoại
//                   </label>
//                   <input
//                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                     type="tel"
//                     id="phone"
//                     placeholder="Nhập số điện thoại"
//                     required
//                   />
//                 </div>
//                 <div className="mb-6">
//                   <label
//                     className="block text-gray-700 mb-2"
//                     htmlFor="password"
//                   >
//                     Mật khẩu
//                   </label>
//                   <input
//                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                     type="password"
//                     id="password"
//                     placeholder="Nhập mật khẩu"
//                     required
//                   />
//                 </div>
//                 <button
//                   className="w-full bg-green-400 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300"
//                   type="submit"
//                 >
//                   Đăng ký
//                 </button>
//               </>
//             ) : (
//               <>
//                 <div className="mb-4">
//                   <label
//                     className="block text-gray-700 mb-2"
//                     htmlFor="username"
//                   >
//                     Tên đăng nhập
//                   </label>
//                   <input
//                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                     type="text"
//                     id="username"
//                     placeholder="Nhập tên đăng nhập"
//                     required
//                   />
//                 </div>
//                 <div className="mb-6">
//                   <label
//                     className="block text-gray-700 mb-2"
//                     htmlFor="password"
//                   >
//                     Mật khẩu
//                   </label>
//                   <input
//                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                     type="password"
//                     id="password"
//                     placeholder="Nhập mật khẩu"
//                     required
//                   />
//                 </div>
//                 <button
//                   className="w-full bg-green-400 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300"
//                   type="submit"
//                 >
//                   Đăng nhập
//                 </button>
//               </>
//             )}
//           </form>
//           <p className="mt-4 text-center">
//             {isRegister ? (
//               <>
//                 Đã có tài khoản?{" "}
//                 <a
//                   href="#"
//                   className="text-green-400 hover:underline"
//                   onClick={handleFormSwitch}
//                 >
//                   Đăng nhập
//                 </a>
//               </>
//             ) : (
//               <>
//                 Chưa có tài khoản?{" "}
//                 <a
//                   href="#"
//                   className="text-green-400 hover:underline"
//                   onClick={handleFormSwitch}
//                 >
//                   Đăng ký
//                 </a>
//               </>
//             )}
//           </p>
//           <p className="mt-4 text-center">
//             <a href="#" className="text-green-400 hover:underline">
//               Quên mật khẩu?
//             </a>
//           </p>
//         </div>
//         <div className="w-1/2">
//           <img src={logo} alt="Login" className="object-cover w-full h-full" />
//         </div>
//       </div>
//     </div>
//   );
// };
