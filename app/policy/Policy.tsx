import React from 'react';
import { styles } from '../styles/style';

type Props = {};

const Policy = ({}: Props) => {
  return (
    <div className="min-h-screen pt-10 lg:pt-20 pb-6">
      <div className="w-[95%] 800px:w-[92%] max-w-7xl mx-auto py-5 lg:px-10 md:px-5 px-5  bg-white dark:bg-gray-800 rounded-lg shadow-xl text-black dark:text-white">
        <h1 className={`${styles.title} !text-start pt-2 text-4xl font-bold`}>
          Platform Terms and Conditions
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Effective Date: January 1, 2025
        </p>

        <ul style={{ listStyle: 'disc', marginLeft: '20px' }} className="text-[16px] leading-7">
          <li className="mb-4">
            <strong>User Accounts:</strong> Users must create an account to access the features of
            Kai-Elearning. Please ensure that all information provided during registration is
            accurate and up to date. Users are responsible for maintaining the security of their
            accounts.
          </li>
          <li className="mb-4">
            <strong>Content Usage:</strong> All learning materials on the platform, including
            videos, documents, and quizzes, are copyrighted. Unauthorized copying, sharing, or
            distribution is strictly prohibited.
          </li>
          <li className="mb-4">
            <strong>Privacy Policy:</strong> We prioritize your privacy. Any personal information
            collected will be used strictly for platform purposes and will not be shared with
            third-party services without your consent.
          </li>
          <li className="mb-4">
            <strong>Prohibited Activities:</strong> Users are prohibited from engaging in
            activities that disrupt the platform’s functionality, including hacking, spreading
            malware, or using abusive language in forums or chat.
          </li>
          <li className="mb-4">
            <strong>Termination of Access:</strong> Kai-Elearning reserves the right to suspend or
            terminate accounts that violate our terms of service without prior notice.
          </li>
          <li className="mb-4">
            <strong>Payment and Refunds:</strong> Any payments made for courses or subscriptions are
            non-refundable unless otherwise stated. Users are encouraged to review course details
            before purchasing.
          </li>
          <li className="mb-4">
            <strong>Third-Party Services:</strong> Some features may rely on third-party services.
            Kai-Elearning is not responsible for the availability, functionality, or security of
            these services.
          </li>
          <li className="mb-4">
            <strong>Intellectual Property Rights:</strong> All content, trademarks, and designs
            available on Kai-Elearning are owned by their respective creators. Users must respect
            these rights at all times.
          </li>
          <li className="mb-4">
            <strong>Limitation of Liability:</strong> Kai-Elearning is not liable for any direct or
            indirect damages arising from the use or inability to use the platform.
          </li>
          <li className="mb-4">
            <strong>Community Guidelines:</strong> Users must adhere to our community guidelines,
            which promote respectful and constructive engagement. Violations may result in account
            suspension or termination.
          </li>
          <li className="mb-4">
            <strong>Updates to Terms:</strong> Kai-Elearning reserves the right to update these
            terms and conditions at any time. Users are advised to review them regularly for
            changes.
          </li>
        </ul>

        <p className="mt-5 text-[14px] text-gray-500 dark:text-gray-400">
          By using this platform, you agree to these terms and conditions. Kai-Elearning reserves
          the right to modify these terms at any time, and changes will be communicated on this
          page.
        </p>

        <p className='mt-5 text-[14px] text-gray-500 dark:text-gray-400'>
          <span className='text-2xl '> Kaif Qureshi..</span>
          <br />
          Founder and CEO of Kai-Elearning 
        </p>
      </div>
    </div>
  );
};

export default Policy;
