import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Filter from "./Filter";

const AdminControl = () => {
  const [value, setValue] = useState([]);
  const [run, setRun] = useState(true);
  const [check, setCheck] = useState(true);
  const [email, setEmail] = useState("");
  const [fullname, setFullName] = useState("");
  const [passsword, setPassword] = useState("");
  const [edit, setEdit] = useState(true);
  const [idCheck, setIdCheck] = useState("");
  const [addData, setAddData] = useState(false);
  const [value1, setValue1] = useState({});
  const [drop, setDrop] = useState({ category: "Actor" });
  const [filter, setFilter] = useState();
  const [fitlerDrop, setFilterDrop] = useState();
  const [status, setStatus] = useState();

  useEffect(() => {
    console.log("Value of filter", filter);
    axios.get(`http://localhost:5000/filter/${filter}`).then((result) => {
      console.log("Result after submit", result);
      setValue(result.data);
    });
  }, [filter]);

  useEffect(() => {
    console.log("http://localhost:5000/all-details");
    const token = sessionStorage.getItem("auth-token");

    axios
      .get(
        "http://localhost:5000/",
        token && {
          headers: {
            "auth-token": token,
          },
        }
      )
      .then((result) => {
        setValue(() => setValue(result.data));
        console.log("Result", result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [run, check, status]);
  const showAllData = () => {
    console.log("All Data");
    const token = sessionStorage.getItem("auth-token");

    axios
      .get(
        "http://localhost:5000/",
        token && {
          headers: {
            "auth-token": token,
          },
        }
      )
      .then((result) => {
        setValue(() => setValue(result.data));
        console.log("Result", result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(async () => {
    try {
      console.log("hello sign");
      const dropval = await axios.get("http://localhost:5000/dropdownvalue");
      const storeddrop = dropval.data;
      setDrop(storeddrop);
      setFilterDrop(storeddrop);
      console.log("The Value of drop", drop);
    } catch (er) {
      console.log(er);
    }
  }, []);
  const deleteValue = async (id) => {
    try {
      axios.patch(`http://localhost:5000/deactive/${id}`).then((result) => {
        if (result.status === 200) {
          setStatus(false);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  const activeValue = async (id) => {
    try {
      axios.patch(`http://localhost:5000/active/${id}`).then((result) => {
        if (result.status === 200) {
          setStatus(true);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  const Edit = (id, email) => {
    console.log("Let's set", id);
    setEmail(() => setEmail(email));
    setIdCheck(() => setIdCheck(id));
    setEdit((prev) => !prev);
  };
  const upDate = async (id) => {
    setCheck((prev) => !prev);
    setEdit((prev) => !prev);
    console.log(check);
    const data = JSON.stringify({ email });
    console.log(data);
    try {
      console.log("Working..");
      const port = "http://localhost:5000/user-details";
      const res = await axios.patch(`${port}/${id}`, {
        email: email,
        fullname: fullname,
      });
      const data1 = await res;
      console.log("The data value", data1);
    } catch (err) {
      console.log(err);
    }
    setIdCheck("");
  };

  const handleChange = (key, value) => {
    setValue1((prev) => ({ ...prev, [key]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setAddData(!addData);
    console.log("submiting", value1);
    try {
      const res = await axios.post("http://localhost:5000/signup/", value1);
      console.log("from", res);
    } catch (e) {
      console.log({ e });
      console.log({
        emailError: e.response.data.errors.email,
        passwrodError: e.response.data.errors.password,
      });
    }
  };
  const AddValue = () => {
    return (
      <form onSubmit={handleSubmit} className="form-group ">
        <center>
          <h2 >Add New Data</h2>
        </center>
        <label for="fullname">Full Name</label>
        <input
          type="text"
          name="fullname"
          required
          value={value1.fullname}
          onChange={(e) => handleChange("fullname", e.target.value)}
          className="form-control"
        />
        <label for="email">Email</label>
        <input
          type="text"
          name="email"
          required
          value={value1.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className="form-control"
        />
        <div class="email error"></div>
        <label for="password">password</label>
        <input
          type="password"
          name="password"
          required
          value={value1.password}
          className="form-control"
          onChange={(e) => handleChange("password", e.target.value)}
        />
        <div class="password error"></div>
        <select
          className="dropdown mt-2 p-2 bg-secondary"
          onChange={(e) => {
            handleChange("category", e.target.value);
          }}
          name="category"
        >
          {drop &&
            drop.map((val, index) => {
              return (
                <option value={val.category} className="bg-white">
                  {val.category}
                </option>
              );
            })}
        </select>
        <center>
          {" "}
          <button className="btn btn-primary mt-2 ">Add</button>
        </center>
      </form>
    );
  };

  const newData = () => {
    setAddData(!addData);
  };
  return (
    <>
      <Navbar />
      <>
        <center>
          <h1>Hello Admin </h1>
        </center>
        <center>
          <button onClick={newData} className="mt-2 p-2 btn btn-primary">
            {addData ? "Don't Add" : "Add New Data"}
          </button>
        </center>
        {addData ? AddValue() : null}
        <br />
        <center>
          <button onClick={showAllData}>All Data</button>
        </center>

        {value &&
          value.map((val, index) => {
            return (
              <>
                {val.role === 0 ? (
                  <div key={index}>
                    {edit ? (
                      <>
                        <center>
                          <span>Name:</span>
                          <p className={val.active ? "text-danger" : "line"}>
                            {val.fullname}
                          </p>
                        </center>
                        <center>
                          <span>Email :</span>
                          <p className={val.active ? "text-danger" : "line"}>
                            {val.email}
                          </p>
                        </center>
                        <center>
                          <span>Category :</span>
                          <p className={val.active ? "text-danger" : "line"}>
                            {val.category}
                          </p>
                        </center>
                      </>
                    ) : (
                      <>
                        {idCheck === val._id ? (
                          <>
                            <center>
                              <label>Email id:</label>
                            </center>
                            <input
                              defaultValue={val.email}
                              value={email}
                              onChange={(e) => {
                                setEmail(e.target.value);
                                console.log(e.target.value);
                              }}
                              className="form-width form-control"
                            />
                            <center>
                              <label>Full Name:</label>
                            </center>

                            <input
                              defaultValue={val.fullname}
                              value={fullname}
                              onChange={(e) => {
                                setFullName(e.target.value);
                                console.log(e.target.value);
                              }}
                              className="form-width form-control"
                            />
                          </>
                        ) : (
                          <>
                            <center>
                              <p>{val.fullname}</p>
                            </center>
                            <center>
                              <p>{val.email}</p>
                            </center>
                          </>
                        )}
                      </>
                    )}
                    <center>
                      {val.active ? (
                        <button
                          onClick={() => deleteValue(val._id)}
                          className="btn btn-primary mt-2 mr-2"
                        >
                          Deactivate User
                        </button>
                      ) : (
                        <button
                          onClick={() => activeValue(val._id)}
                          className="btn btn-primary mt-2 mr-2"
                        >
                          Activate User
                        </button>
                      )}
                      {edit ? (
                        <button
                          onClick={() => Edit(val._id, val.email)}
                          className="btn btn-primary mt-2"
                          disabled={val.active ? false : true}
                        >
                          Edit
                        </button>
                      ) : (
                        <>
                          {idCheck === val._id ? (
                            <button
                              onClick={() => upDate(val._id)}
                              className="btn btn-primary mt-2 "
                              disabled={val.active ? false : true}
                            >
                              update
                            </button>
                          ) : (
                            <button
                              onClick={() => Edit(val._id)}
                              disabled={val.active ? false : true}
                            >
                              Edit
                            </button>
                          )}{" "}
                        </>
                      )}
                    </center>
                  </div>
                ) : (
                  ""
                )}
              </>
            );
          })}
      </>
      {/* } */}
    </>
  );
};
export default AdminControl;
