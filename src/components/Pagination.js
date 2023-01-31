import styled from "styled-components";

const Nav = styled.nav`
    display: block; 
    text-align: center; 
    margin-top: 50px; 
    justify-content: center;
`;

const Button = styled.button`
    border:1px solid #ccc;
    background:#f8f8f8 url('img/page_pprev.png') no-repeat center center;
	margin-left:10px;
    margin-right:13px;
    width: 30px;
    height: 30px;

  &:hover {
    background: skyBlue;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background: lightGrey;
    cursor: revert;
    transform: revert;
    color: none;
  }

  &[aria-current] {
    background: grey;
    font-weight: bold;
    color: white;
    cursor: revert;
    transform: revert;
  }
`;

const NumButton = styled.button`
    border:1px solid #ccc;
    background:#f8f8f8 url('img/page_pprev.png') no-repeat center center;
    margin-left:0;
    margin-right:3px;
    width: 30px;
    height: 30px;

  &:hover {
    background: skyBlue;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[aria-current] {
    background-color:#2962ff;
	color:#fff;
	border:1px solid #42454c;
    cursor: revert;
    transform: revert;
  }
`;

function Pagination({ total, cntPerPage, nowPage, setNowPage, allCheck }) {
  const totalPage = Math.ceil(total / cntPerPage);

  if(total === 0){
    return <Nav><NumButton style={{backgroundColor: "#42454c", color: "white", cursor: "revert", transform: "revert"}} disabled>1</NumButton></Nav>
  }

  return (
    <>
      <Nav>
        <Button onClick={() => {setNowPage(nowPage - 1); allCheck()}} disabled={nowPage === 1}>
          &lt;
        </Button>
        {Array(totalPage)
          .fill()
          .map((_, i) => (
            <NumButton
              key={i + 1}
              onClick={() => {setNowPage(i + 1); allCheck()}}
              aria-current={nowPage === i + 1 ? "page" : null}
            >
              {i + 1}
            </NumButton>
          ))}
        <Button onClick={() => {setNowPage(nowPage + 1); allCheck()}} disabled={nowPage === totalPage}>
          &gt;
        </Button>
      </Nav>
    </>
  );
}



export default Pagination;