import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import "./Table.css";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Table } from "antd";
import SideNavigator from "../../Layout/SideBarNav";
import { SideContext } from "../../Context/SideCtx";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Covid = () => {
  const [provinsi, setProvinsi] = useState([]);
  const [kabupaten, setKabupaten] = useState([]);
  const [faskes, setFaskes] = useState([]);
  const [dataNamaPublic, setDataNamaPublic] = useState([]);

  const [totalV1Array, setTotalV1Array] = useState([]);
  const [totalV2Array, setTotalV2Array] = useState([]);
  const [totalAllArray, setTotalAllArray] = useState([]);

  const [filterProvinsi, setFilterProvinsi] = useState(null);
  const [filterKabupaten, setFilterKabupaten] = useState(null);
  const [filter, setFilter] = useState(null);

  const { toogleSideBar, setToogleSideBar } = useContext(SideContext);

  useEffect(async () => {
    // console.log("from log");

    const result = await axios
      .post("https://kipi.covid19.go.id/api/get-province")
      .then((result) => {
        // console.log(result.data.results);
        setProvinsi(result.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const provinsiHandler = async (event) => {
    event.preventDefault();

    const value = event.target.value;
    setFilterProvinsi(value);
    // console.log(value);

    console.log("from kabupaten");

    const result = await axios
      .post(`https://kipi.covid19.go.id/api/get-city?start_id=${value}`)
      .then((result) => {
        // console.log(result);
        setKabupaten(result.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const kabupatenHandler = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setFilterKabupaten(value);
    // console.log(value);
  };

  const filterHandler = async (event) => {
    event.preventDefault();
    console.log(filterProvinsi);
    console.log(filterKabupaten);

    let dataNama = [];
    let arrayV1 = [];
    let arrayV2 = [];
    let arrayTotal = [];

    const result = await axios.get(
      `https://kipi.covid19.go.id/api/get-faskes-vaksinasi?province=${filterProvinsi}&city=${filterKabupaten}`
    );

    console.log(result.data.data);
    const data = result.data.data;
    // console.log(data);

    data.map((item, key) => {
      const detail = item.detail;
      const panjang = detail.length;
      //   console.log(key);

      //   console.log(detail[0].divaksin_1);
      let totalV1 = 0;
      let totalV2 = 0;
      let totalVaksin = 0;

      for (let index = 0; index < panjang; index++) {
        const vaksin1 = detail[index].divaksin_1;
        const vaksin2 = detail[index].divaksin_2;
        totalV1 += vaksin1;
        totalV2 += vaksin2;
        totalVaksin = totalV1 + totalV2;
      }
      arrayV1.push(totalV1);
      arrayV2.push(totalV2);
      arrayTotal.push(totalVaksin);
      dataNama.push(key + 1);

      setTotalV1Array(arrayV1);
      setTotalV2Array(arrayV1);
      setTotalAllArray(arrayTotal);
      setDataNamaPublic(dataNama);
    });
    data.map((item, key) => {
      //   console.log(key);
      item["number"] = key + 1;
    });
    setFaskes(data);
    // console.log(data);
    // console.log({ faskes });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "NAMA FASKES",
      dataIndex: "nama",
      key: "nama",
      sorter: (a, b) => a.nama.localeCompare(b.nama),
    },
    {
      title: "ALAMAT",
      dataIndex: "alamat",
      key: "alamat",
      sorter: (a, b) => {
        if (a.alamat < b.alamat) {
          return -1;
        }
        if (a.alamat > b.alamat) {
          return 1;
        }
        return 0;
      },
      render: (param, index) => {
        let text = param;
        if (text == undefined || text == null) {
          return (param = "-");
        } else return text;
      },
    },
    {
      title: "KATEGORI",
      dataIndex: "jenis_faskes",
      key: "jenis_faskes",
      sorter: (a, b) => {
        if (a.jenis_faskes < b.jenis_faskes) {
          return -1;
        }
        if (a.jenis_faskes > b.jenis_faskes) {
          return 1;
        }
        return 0;
      },
      render: (param, index) => {
        let text = param;
        if (text == undefined || text == null) {
          return (param = "-");
        } else return text;
      },
    },
    {
      title: "TOTAL VAKSIN 1",
      dataIndex: "detail",
      key: "detail",
      sorter: (a, b) => a.totalV1 - b.totalV1,
      render: (param, index) => {
        // console.log(param);
        let totalV1 = 0;
        const panjang = param.length;
        for (let index = 0; index < panjang; index++) {
          let vaksin1 = param[index].divaksin_1;
          totalV1 += vaksin1;
        }
        return totalV1;
      },
    },
    {
      title: "TOTAL VAKSIN 2",
      dataIndex: "detail",
      key: "detail",
      sorter: (a, b) => a.totalV2 - b.totalV2,
      render: (param, index) => {
        // console.log(param);
        let totalV2 = 0;
        const panjang = param.length;
        for (let index = 0; index < panjang; index++) {
          let vaksin2 = param[index].divaksin_2;
          totalV2 += vaksin2;
        }
        return totalV2;
      },
    },
    {
      title: "TOTAL VAKSIN 1&2",
      dataIndex: "detail",
      key: "detail",
      sorter: (a, b) => a.total - b.total,
      render: (param, index) => {
        // console.log(param);
        let total = 0;
        const panjang = param.length;
        for (let index = 0; index < panjang; index++) {
          let vaksin = param[index].divaksin;
          total += vaksin;
        }
        return total;
      },
    },
  ];

  const dataTable = faskes;

  function onChange(pagination, sorter, extra) {
    // console.log("params", pagination, sorter, extra);
  }

  return (
    <>
      <SideNavigator />
      <div className={toogleSideBar ? "contents" : "contents-wide"}>
        <div className="search">
          {/* filter provinsi */}
          <select onChange={provinsiHandler}>
            <option>Provinsi</option>

            {provinsi.map((item, key) => {
              return <option value={item.key}>{item.value}</option>;
            })}
          </select>

          {/* filter kabupaten */}
          <select onChange={kabupatenHandler}>
            <option>Kabupaten</option>

            {kabupaten.map((item, key) => {
              return <option value={item.key}>{item.value}</option>;
            })}
          </select>
          <button onClick={filterHandler}>Filter</button>
        </div>

        <br />

        <div className={!toogleSideBar ? "wide-chart" : "narrow-chart"}>
          <div class="div-bar">
            <Bar
              data={{
                labels: dataNamaPublic,
                datasets: [
                  {
                    label: "Vaksin 1",
                    data: totalV1Array,
                    backgroundColor: "#A1A1A1",
                  },
                ],
              }}
              className="chart-bar"
            />
            <p>Vaksinasi Tahap 1</p>
          </div>
          <div class="div-bar">
            <Bar
              data={{
                labels: dataNamaPublic,
                datasets: [
                  {
                    label: "Vaksin 2",
                    data: totalV2Array,
                    backgroundColor: "#A1A1A1",
                  },
                ],
              }}
              className="chart-bar"
            />
            <p>Vaksinasi Tahap 2</p>
          </div>
          <div class="div-bar">
            <Bar
              data={{
                labels: dataNamaPublic,
                datasets: [
                  {
                    label: "Total Vaksin",
                    data: totalAllArray,
                    backgroundColor: "#A1A1A1",
                  },
                ],
              }}
              className="chart-bar"
            />
            <p>Total</p>
          </div>
        </div>

        <br />

        <div className="table">
          <Table columns={columns} dataSource={dataTable} onChange={onChange} />
        </div>
      </div>
    </>
  );
};

export default Covid;
