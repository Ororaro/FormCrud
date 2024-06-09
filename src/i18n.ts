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
            firstName: 'Firstname',
            lastName: 'lastName',
            birthday: 'Birthday',
            nationality: 'Nationality',
            citizenID: 'CitizenID',
            gender: 'Gender',
            mobile_Phone: 'Mobile Phone',
            passport_No: 'Passport No',
            epSalary: 'Expected Salary',
            reset: 'Reset',
            submit: 'Submit'
          },
          table: {
            name: 'Name',
            gender: 'Gender',
            mobile_Phone: 'Mobile Phone',
            nationality: 'Nationality',
            manage: 'Manage'
          }
        }
      },
      th: {
        translation: {
          form: {
            formTable:'การจัดการหน้าฟอร์ม',
            title: 'คำนำหน้า',
            firstName: 'ชื่อจริง',
            lastName: 'นามสกุล',
            birthday: 'วันเกิด',
            nationality: 'สัญชาติ',
            citizenID: 'เลขบัตรประชาชน ',
            gender: 'เพศ',
            mobile_Phone: 'หมายเลขโทรศัพท์มือถือ',
            passport_No: 'หนังสือเดินทาง',
            epSalary: 'เงินเดือนที่คาดหวัง',
            reset: 'ล้างข้อมูล',
            submit: 'ส่งข้อมูล'
          },
          table: {
            name: 'ชื่อ',
            gender: 'เพศ',
            mobile_Phone: 'เบอร์โทรศัพท์มือถือ',
            nationality: 'สัญชาติ',
            manage: 'จัดการ'
          }
        }
      }
    }
  });

export default i18n;