import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          form: {
            formTable:'Form & Table',
            title: 'title',
            firstname: 'Firstname',
            lastname: 'lastName',
            birthday: 'Birthday',
            nationality: 'Nationality',
            citizenID: 'CitizenID',
            gender: 'Gender',
            mobile_Phone: 'Mobile Phone',
            passport_No: 'Passport No',
            epSalary: 'Expected Salary',
            reset: 'Reset',
            submit: 'Submit',
            male: 'Male',
            female: 'Female',
            unsex: 'Unsex',
            home: 'Home',
            mr:'Mr.',
            mrs:'Mrs.',
            ms:'Ms.',
            thai: 'Thai',
            french: 'French',
            american: 'American',
            selectnation: 'Please Select',
            date: 'YYYY/MM/DD',
          },
          table: {
            name: 'Name',
            gender: 'Gender',
            mobile_Phone: 'Mobile Phone',
            nationality: 'Nationality',
            manage: 'Manage',
            edit: 'Edit',
            delete: 'Delete',
          }
        }
      },
      th: {
        translation: {
          form: {
            formTable:'การจัดการหน้าฟอร์ม',
            title: 'คำนำหน้า',
            firstname: 'ชื่อจริง',
            lastname: 'นามสกุล',
            birthday: 'วันเกิด',
            nationality: 'สัญชาติ',
            citizenID: 'เลขบัตรประชาชน ',
            gender: 'เพศ',
            mobile_Phone: 'หมายเลขโทรศัพท์มือถือ',
            passport_No: 'หนังสือเดินทาง',
            epSalary: 'เงินเดือนที่คาดหวัง',
            reset: 'ล้างข้อมูล',
            submit: 'ส่งข้อมูล',
            male: 'ผู้ชาย',
            female: 'ผู้หญิง',
            unsex: 'ไม่ระบุ',
            home: 'หน้าหลัก',
            mr:'นาย.',
            mrs:'นางสาว.',
            ms:'นาง.',
            thai: 'ไทย',
            french: 'ฝรั่งเศส',
            american: 'อเมริกัน',
            selectnation: 'กรุณาเลือก',
            date: 'ปี/เดือน/วัน'
          },
          table: {
            name: 'ชื่อ',
            gender: 'เพศ',
            mobile_Phone: 'เบอร์โทรศัพท์มือถือ',
            nationality: 'สัญชาติ',
            manage: 'จัดการ',
            edit: 'แก้ไขข้อมูล',
            delete: 'ลบข้อมูล'
          }
        }
      }
    }
  });

export default i18n;