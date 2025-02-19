// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
// import { Breadcrumb, ButtonOne, ButtonTwo } from '../../../..';
// import { useDispatch, useSelector } from 'react-redux';
// import Layout from '../../../../../layout';
// import axios from 'axios';
// import { getMe } from '../../../../../config/redux/action';
// import Swal from 'sweetalert2';

// const FormEditDataPegawai = () => {
//     const [nik, setNik] = useState('');
//     const [namaPegawai, setNamaPegawai] = useState('');
//     const [username, setUsername] = useState('');
//     const [jenisKelamin, setJenisKelamin] = useState('');
//     const [jabatan, setJabatan] = useState('');
//     const [tanggalMasuk, setTanggalMasuk] = useState('');
//     const [status, setStatus] = useState('');
//     const [hakAkses, setHakAkses] = useState('');
//     const [msg, setMsg] = useState('');
//     const { id } = useParams();

//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { isError, user } = useSelector((state) => state.auth);

//     const updateUser = async (e) => {
//         e.preventDefault();
//         try {
//             const formData = new FormData();
//             formData.append('nik', nik);
//             formData.append('nama_pegawai', namaPegawai);
//             formData.append('username', username);
//             formData.append('jenis_kelamin', jenisKelamin);
//             formData.append('jabatan', jabatan);
//             formData.append('tanggal_masuk', tanggalMasuk);
//             formData.append('status', status);
//             formData.append('hak_akses', hakAkses);

//             const response = await axios.patch(`http://localhost:5000/data_pegawai/${id}`, formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });
//             setMsg(response.data.msg);
//             Swal.fire({
//                 icon: 'success',
//                 title: 'Berhasil',
//                 timer: 1500,
//                 text: response.data.msg
//             });
//             navigate('/data-pegawai');
//         } catch (error) {
//             setMsg(error.response.data.msg);
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Gagal',
//                 text: error.response.data.msg
//             });
//         }
//     };

//     useEffect(() => {
//         const getUserById = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:5000/data_pegawai/id/${id}`);
//                 const data = response.data;
//                 setNik(data.nik);
//                 setNamaPegawai(data.nama_pegawai);
//                 setUsername(data.username);
//                 setJenisKelamin(data.jenis_kelamin);
//                 setJabatan(data.jabatan);
//                 setTanggalMasuk(data.tanggal_masuk);
//                 setStatus(data.status);
//                 setHakAkses(data.hak_akses);
//             } catch (error) {
//                 if (error.response) {
//                     setMsg(error.response.data.msg);
//                 }
//             }
//         };
//         getUserById();
//     }, [id]);

//     useEffect(() => {
//         dispatch(getMe());
//     }, [dispatch]);

//     useEffect(() => {
//         if (isError) {
//             navigate('/login');
//         }
//         if (user && user.hak_akses !== 'admin') {
//             navigate('/dashboard');
//         }
//     }, [isError, user, navigate]);

//     return (
//         <Layout>
//             <Breadcrumb pageName='Form Edit Pegawai' />
//             <div className='sm:grid-cols-2'>
//                 <div className='flex flex-col gap-9'>
//                     <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
//                         <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
//                             <h3 className='font-medium text-black dark:text-white'>
//                                 Form Edit Data Pegawai
//                             </h3>
//                         </div>
//                         <form onSubmit={updateUser}>
//                             <p className='text-meta-1'>{msg}</p>
//                             <div className='p-6.5'>
//                                 <div className='mb-4.5 flex flex-col gap-6 xl:flex-row'>
//                                     <div className='w-full xl:w-1/2'>
//                                         <label className='mb-2.5 block text-black dark:text-white'>
//                                             NIK <span className='text-meta-1'>*</span>
//                                         </label>
//                                         <input
//                                             type='number'
//                                             id='nik'
//                                             name='nik'
//                                             value={nik}
//                                             onChange={(e) => setNik(e.target.value)}
//                                             required
//                                             placeholder='Masukkan nomor nik'
//                                             className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
//                                         />
//                                     </div>

//                                     <div className='w-full xl:w-1/2'>
//                                         <label className='mb-2.5 block text-black dark:text-white'>
//                                             Nama Lengkap <span className='text-meta-1'>*</span>
//                                         </label>
//                                         <input
//                                             type='text'
//                                             id='namaPegawai'
//                                             name='namaPegawai'
//                                             value={namaPegawai}
//                                             onChange={(e) => setNamaPegawai(e.target.value)}
//                                             required={true}
//                                             placeholder='Masukkan nama lengkap'
//                                             className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
//                                     <div className='w-full xl:w-1/2'>
//                                         <label className='mb-2.5 block text-black dark:text-white'>
//                                             Username <span className='text-meta-1'>*</span>
//                                         </label>
//                                         <input
//                                             type='username'
//                                             id='username'
//                                             name='username'
//                                             value={username}
//                                             onChange={(e) => setUsername(e.target.value)}
//                                             required={true}
//                                             placeholder='Masukkan username'
//                                             className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
//                                         />
//                                     </div>

//                                     <div className='w-full xl:w-1/2'>
//                                         <label className='mb-2.5 block text-black dark:text-white'>
//                                             Jenis Kelamin <span className='text-meta-1'>*</span>
//                                         </label>
//                                         <div className='relative z-20 bg-transparent dark:bg-form-input'>
//                                             <select className='relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
//                                                 id='jenisKelamin'
//                                                 name='jenisKelamin'
//                                                 value={jenisKelamin}
//                                                 onChange={(e) => setJenisKelamin(e.target.value)}
//                                                 required={true}
//                                             >
//                                                 <option value='' disabled={true}>Pilih jenis kelamin</option>
//                                                 <option value='laki-laki'>Laki-Laki</option>
//                                                 <option value='perempuan'>Perempuan</option>
//                                             </select>
//                                             <span className='absolute top-1/2 right-4 z-30 -translate-y-1/2 text-2xl'>
//                                                 <MdOutlineKeyboardArrowDown />
//                                             </span>
//                                         </div>
//                                     </div>

//                                 </div>
//                                 <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
//                                     <div className='w-full xl:w-1/2'>
//                                         <label className='mb-2.5 block text-black dark:text-white'>
//                                             Jabatan <span className='text-meta-1'>*</span>
//                                         </label>
//                                         <input
//                                             type='text'
//                                             id='jabatan'
//                                             name='jabatan'
//                                             value={jabatan}
//                                             onChange={(e) => setJabatan(e.target.value)}
//                                             required={true}
//                                             placeholder='Masukkan jabatan'
//                                             className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
//                                         />
//                                     </div>
//                                     <div className='w-full xl:w-1/2'>
//                                         <label className='mb-2.5 block text-black dark:text-white'>
//                                             Tanggal Masuk <span className='text-meta-1'>*</span>
//                                         </label>
//                                         <input
//                                             type='date'
//                                             id='tanggalMasuk'
//                                             name='tanggalMasuk'
//                                             value={tanggalMasuk}
//                                             onChange={(e) => setTanggalMasuk(e.target.value)}
//                                             required={true}
//                                             className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
//                                         />
//                                     </div>
//                                 </div>

//                                 <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
//                                     <div className='w-full xl:w-1/2'>
//                                         <label className='mb-2.5 block text-black dark:text-white'>
//                                             Status <span className='text-meta-1'>*</span>
//                                         </label>
//                                         <div className='relative z-20 bg-transparent dark:bg-form-input'>
//                                             <select className='relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
//                                                 id='status'
//                                                 name='status'
//                                                 value={status}
//                                                 onChange={(e) => setStatus(e.target.value)}
//                                                 required={true}
//                                             >
//                                                 <option value='' disabled={true}>Pilih status</option>
//                                                 <option value='karyawan tetap'>Karyawan Tetap</option>
//                                                 <option value='karyawan tidak tetap'>Karyawan Tidak Tetap</option>
//                                             </select>
//                                             <span className='absolute top-1/2 right-4 z-30 -translate-y-1/2 text-2xl'>
//                                                 <MdOutlineKeyboardArrowDown />
//                                             </span>
//                                         </div>
//                                     </div>
//                                     <div className='w-full xl:w-1/2'>
//                                         <label className='mb-2.5 block text-black dark:text-white'>
//                                             Hak Akses <span className='text-meta-1'>*</span>
//                                         </label>
//                                         <div className='relative z-20 bg-transparent dark:bg-form-input'>
//                                             <select className='relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
//                                                 id='hak_akses'
//                                                 name='hak_akses'
//                                                 value={hakAkses}
//                                                 onChange={(e) => setHakAkses(e.target.value)}
//                                                 required={true}
//                                             >
//                                                 <option value='' disabled={true}>Pilih hak akses</option>
//                                                 <option value='admin'>Admin</option>
//                                                 <option value='pegawai'>Pegawai</option>
//                                             </select>
//                                             <span className='absolute top-1/2 right-4 z-30 -translate-y-1/2 text-2xl'>
//                                                 <MdOutlineKeyboardArrowDown />
//                                             </span>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div className='flex flex-col md:flex-row w-full gap-3 text-center'>
//                                     <div>
//                                         <ButtonOne  >
//                                             <span>Perbarui</span>
//                                         </ButtonOne>
//                                     </div>
//                                     <Link to="/data-pegawai" >
//                                         <ButtonTwo  >
//                                             <span>Kembali</span>
//                                         </ButtonTwo>
//                                     </Link>
//                                 </div>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </Layout>
//     )
// }

// export default FormEditDataPegawai;

import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { Breadcrumb, ButtonOne, ButtonTwo } from '../../../..';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../../../../layout';
import axios from 'axios';
import { getMe } from '../../../../../config/redux/action';
import Swal from 'sweetalert2';

const FormEditEmployeeData = () => {
    const [nik, setNik] = useState('');
    const [employee_name, setEmployeeName] = useState('');
    const [username, setUsername] = useState('');
    const [gender, setGender] = useState('');
    const [position, setPosition] = useState('');
    const [join_date, setJoinDate] = useState('');
    const [status, setStatus] = useState('');
    const [access_rights, setAccessLevel] = useState('');
    const [msg, setMsg] = useState('');
    const { id } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, user } = useSelector((state) => state.auth);

    const updateEmployee = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('nik', nik);
            formData.append('employee_name', employee_name);
            formData.append('username', username);
            formData.append('gender', gender);
            formData.append('position', position);
            formData.append('join_date', join_date);
            formData.append('status', status);
            formData.append('access_rights', access_rights);

            const response = await axios.patch(`http://localhost:5000/employee_data/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setMsg(response.data.msg);
            Swal.fire({
                icon: 'success',
                title: 'Success',
                timer: 1500,
                text: response.data.msg
            });
            navigate('/employee-data');
        } catch (error) {
            setMsg(error.response.data.msg);
            Swal.fire({
                icon: 'error',
                title: 'Failed',
                text: error.response.data.msg
            });
        }
    };

    useEffect(() => {
        const getEmployeeById = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/employee_data/id/${id}`);
                const data = response.data;
                setNik(data.nik);
                setEmployeeName(data.employee_name);
                setUsername(data.username);
                setGender(data.gender);
                setPosition(data.position);
                setJoinDate(data.join_date);
                setStatus(data.status);
                setAccessLevel(data.access_rights);
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                }
            }
        };
        getEmployeeById();
    }, [id]);

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);
//commented by me
    // useEffect(() => {
    //     if (isError) {
    //         navigate('/login');
    //     }
    //     if (user && user.access_rights !== 'admin') {
    //         navigate('/dashboard');
    //     }
    // }, [isError, user, navigate]);

    return (
        <Layout>
            <Breadcrumb pageName='Form Edit Employee Data' />
            <div className='sm:grid-cols-2'>
                <div className='flex flex-col gap-9'>
                    <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                            <h3 className='font-medium text-black dark:text-white'>
                                Form Edit Employee Data
                            </h3>
                        </div>
                        <form onSubmit={updateEmployee}>
                            <p className='text-meta-1'>{msg}</p>
                            <div className='p-6.5'>
                                <div className='mb-4.5 flex flex-col gap-6 xl:flex-row'>
                                    <div className='w-full xl:w-1/2'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            NIK <span className='text-meta-1'>*</span>
                                        </label>
                                        <input
                                            type='number'
                                            id='nik'
                                            name='nik'
                                            value={nik}
                                            onChange={(e) => setNik(e.target.value)}
                                            required
                                            placeholder='Enter NIK'
                                            className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                        />
                                    </div>

                                    <div className='w-full xl:w-1/2'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            Employee Name <span className='text-meta-1'>*</span>
                                        </label>
                                        <input
                                            type='text'
                                            id='employee_name'
                                            name='employee_name'
                                            value={employee_name}
                                            onChange={(e) => setEmployeeName(e.target.value)}
                                            required={true}
                                            placeholder='Enter employee name'
                                            className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                        />
                                    </div>
                                </div>
                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className='w-full xl:w-1/2'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            Username <span className='text-meta-1'>*</span>
                                        </label>
                                        <input
                                            type='username'
                                            id='username'
                                            name='username'
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required={true}
                                            placeholder='Enter username'
                                            className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                        />
                                    </div>

                                    <div className='w-full xl:w-1/2'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            Gender <span className='text-meta-1'>*</span>
                                        </label>
                                        <div className='relative z-20 bg-transparent dark:bg-form-input'>
                                            <select className='relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                                id='gender'
                                                name='gender'
                                                value={gender}
                                                onChange={(e) => setGender(e.target.value)}
                                                required={true}
                                            >
                                                <option value='' disabled={true}>Select gender</option>
                                                <option value='male'>Male</option>
                                                <option value='female'>Female</option>
                                            </select>
                                            <span className='absolute top-1/2 right-4 z-30 -translate-y-1/2 text-2xl'>
                                                <MdOutlineKeyboardArrowDown />
                                            </span>
                                        </div>
                                    </div>

                                </div>
                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className='w-full xl:w-1/2'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            Position <span className='text-meta-1'>*</span>
                                        </label>
                                        <input
                                            type='text'
                                            id='position'
                                            name='position'
                                            value={position}
                                            onChange={(e) => setPosition(e.target.value)}
                                            required={true}
                                            placeholder='Enter position'
                                            className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                        />
                                    </div>
                                    <div className='w-full xl:w-1/2'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            Entry Date <span className='text-meta-1'>*</span>
                                        </label>
                                        <input
                                            type='date'
                                            id='join_date'
                                            name='join_date'
                                            value={join_date}
                                            onChange={(e) => setJoinDate(e.target.value)}
                                            required={true}
                                            className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                        />
                                    </div>
                                </div>

                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className='w-full xl:w-1/2'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            Status <span className='text-meta-1'>*</span>
                                        </label>
                                        <div className='relative z-20 bg-transparent dark:bg-form-input'>
                                            <select className='relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                                id='status'
                                                name='status'
                                                value={status}
                                                onChange={(e) => setStatus(e.target.value)}
                                                required={true}
                                            >
                                                <option value='' disabled={true}>Select status</option>
                                                <option value='permanent employee'>Permanent Employee</option>
                                                <option value='non-permanent employee'>Non-Permanent Employee</option>
                                            </select>
                                            <span className='absolute top-1/2 right-4 z-30 -translate-y-1/2 text-2xl'>
                                                <MdOutlineKeyboardArrowDown />
                                            </span>
                                        </div>
                                    </div>
                                    <div className='w-full xl:w-1/2'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            Access Level <span className='text-meta-1'>*</span>
                                        </label>
                                        <div className='relative z-20 bg-transparent dark:bg-form-input'>
                                            <select className='relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                                id='access_rights'
                                                name='access_rights'
                                                value={access_rights}
                                                onChange={(e) => setAccessLevel(e.target.value)}
                                                required={true}
                                            >
                                                <option value='' disabled={true}>Select access level</option>
                                                <option value='admin'>Admin</option>
                                                <option value='employee'>Employee</option>
                                            </select>
                                            <span className='absolute top-1/2 right-4 z-30 -translate-y-1/2 text-2xl'>
                                                <MdOutlineKeyboardArrowDown />
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex flex-col md:flex-row w-full gap-3 text-center'>
                                    <div>
                                        <ButtonOne>
                                            <span>Update</span>
                                        </ButtonOne>
                                    </div>
                                    <Link to="/employee-data">
                                        <ButtonTwo>
                                            <span>Back</span>
                                        </ButtonTwo>
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default FormEditEmployeeData;



