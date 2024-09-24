import SavingsJarForm from './SavingsJarForm';

const SavingsJarFormPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Create a New Savings Jar</h1>
      <SavingsJarForm />
    </div>
  );
};

export default SavingsJarFormPage;
