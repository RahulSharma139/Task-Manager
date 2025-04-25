import Layout from "../elements/layout";

const Page = () => {
  return (
    <>
      <Layout>
        <div className="flex flex-col items-center justify-center w-full bg-gradient-to-r from-slate-400 to-gray-800 h-screen">
          <h2 className="text-7xl font-bold animate-bounce">Welcome to Task Manager</h2>
        </div>
      </Layout>
    </>
  );
};

export default Page;
