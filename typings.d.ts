type Post = {
  title: string;
  slug: string;
  summary: string;
  image: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  }; 
  content: string;
  author: {
    _ref: string;
    _type: "reference";
  }; 
}