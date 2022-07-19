import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body{
    margin: 0rem 10%;
	background: #f1f1f1;
    --primary: #2d2d2d;
    --secondary: #535353
}
h2{
    font-size: 1.2 rem;
    color: var(--primary)
}
h2{
    font-size: 1 rem;
    color: var(--secondary)
}
a{
    color: black;
    text-decoration: none;
}
p{
    line-height:150%
    }
`;
