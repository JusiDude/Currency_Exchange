import { useEffect, useState } from "react";
import Axios from "axios";
import Dropdown from "react-dropdown";
import { HiSwitchHorizontal } from "react-icons/hi";
import "react-dropdown/style.css";
import { Header } from "./Header";
import styled from "styled-components";
import Select from "./Select";

function App() {
  const [info, setInfo] = useState([]);
  const [input, setInput] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [options, setOptions] = useState([]);
  const [output, setOutput] = useState(0);

  useEffect(() => {
    Axios.get(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`
    ).then((res) => {
      setInfo(res.data[from]);
    });
  }, [from]);

  useEffect(() => {
    setOptions(Object.keys(info));
    convert();
  }, [info]);

  function convert() {
    var rate = info[to];
    setOutput(input * rate);
  }

  function flip() {
    var temp = from;
    setFrom(to);
    setTo(temp);
  }

  return (
    <div className="App">
      <Header />
      <Body>
        <div>
          <Title>Конвертер валют</Title>
          <Box>
            <Div>
              <LeftSide>
                <Dropdown
                  options={options}
                  onChange={(e) => {
                    setFrom(e.value);
                  }}
                  value={from}
                  placeholder="From"
                />
                <Input
                  type="number"
                  placeholder="Enter the amount"
                  onChange={(e) => setInput(e.target.value)}
                />
              </LeftSide>
              <Midle>
                <HiSwitchHorizontal
                  size="35px"
                  color="#4F937E"
                  onClick={() => {
                    flip();
                  }}
                />
              </Midle>
              <RightSide>
                <Dropdown
                  options={options}
                  onChange={(e) => {
                    setTo(e.value);
                  }}
                  value={to}
                  placeholder="To"
                />
                <Input disabled value={output.toFixed(2)} />
              </RightSide>
            </Div>
            <ButtonDiv>
              <Button
                onClick={() => {
                  convert();
                }}
              >
                <span>Конвертувати</span>
              </Button>
            </ButtonDiv>
          </Box>
        </div>
      </Body>
    </div>
  );
}

export default App;

const Body = styled.div`
  display: flex;
  padding: 100px;
  flex-direction: column;

  align-items: center;
`;
const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
`;
const Button = styled.button`
  padding: 10px;
  gap: 10px;
  font-family: "Tahoma";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  /* identical to box height */

  color: #ffffff;
  position: relative;
  top: 50px;
  width: 276px;
  height: 74px;
  border: none;

  background: #4f937e;
  border-radius: 15px;
  :hover {
    background: #4f937e;
    border: 2px solid darkgreen;
  }
`;
const Div = styled.div`
  display: flex;
`;
const Midle = styled.div`
  width: 10%;
  padding-top: 100px;
  height: 50%;
`;
const LeftSide = styled.div`
  height: 60%;
  width: 40%;
  padding: 50px;
`;
const RightSide = styled.div`
  height: 60%;
  width: 40%;
  padding: 50px;
  margin-left: auto;
`;
const Input = styled.input`
  box-sizing: border-box;
  margin-top: 20px;
  font-size: 24px;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 10px;
  gap: 10px;
  width: 455px;
  height: 85px;
  background: #e8e7e7;
  border: 1px solid #737373;
  border-radius: 15px;
`;
const Box = styled.div`
  box-sizing: border-box;
  position: relative;
  margin-top: 20px;
  width: 1140px;
  height: 448px;

  border: 1px solid #4f937e;

  border-radius: 30px;
`;
const Title = styled.div`
  font-family: "Tahoma";
  font-style: normal;
  font-weight: 400;
  font-size: 48px;
  line-height: 58px;
  /* identical to box height */

  color: #000000;
`;
