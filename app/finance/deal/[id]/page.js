export default function Deal({params: {id}}) {
    return<h1>Deal {id}</h1>;
  }

  export function generateMetadata({params: {id}}) {
    return {
      title: id
    }
  }