'use client';

import React, { useEffect, useState } from "react";
import "./Tree.css";
import Scene from "scenejs"; 
import Modal from './modal';
import Modal2 from './modal2';
import Modal3 from './modal3';
import Modal4 from './modal4';

import {BiCloudRain , BiGift, BiBookOpen, BiInfoCircle } from "react-icons/bi";
import { ToastContainer, toast } from 'react-toastify';
import instance from "@/lib/axios";
import 'react-toastify/dist/ReactToastify.css';

const Tree = () => {
  const [level, setLevel] = useState(0); 
  const [waterPoint, setWaterPoint] = useState(0);
  const [isDark, setIsDark] = useState(false); 
  const [isClient, setIsClient] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [isDogamModalOpen, setIsDogamModalOpen] = useState(false);
  const [isNewTreeModalOpen, setIsNewTreeModalOpen] = useState(false);
  const [newTreeNumber, setNewTreeNumber] = useState<number | null>(null); 

  const openModal = () => {
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false); 
  };


  const openDogamModal = () => {
    setIsDogamModalOpen(true); 
  };

  const closeDogamModal = () => {
    setIsDogamModalOpen(false); 
  };

  const openNewTreeModal = () => {
    setIsNewTreeModalOpen(true); 
  };

  const closeNewTreeModal = () => {
    setIsNewTreeModalOpen(false); 
  };
  
  

  const openModal2 = () => {
    setIsModal2Open(true); 
  };

  const closeModal2 = () => {
    setIsModal2Open(false); 
  };



  
  useEffect(() => {
    setIsClient(true);
  }, []);
  

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 6 || currentHour >= 18) {
      setIsDark(true); 
    } else {
      setIsDark(false); 
    }
  }, []); 

  useEffect(() => {
    const fetchWaterPoint = async () => {
      try {
        const response = await instance.get(`/tree/info`); 
        setWaterPoint(response.data.count / 500); 
        // setWaterPoint(2);
      } catch (error) {
      }
    };

    fetchWaterPoint(); 
  }, []);
  
  useEffect(() => {
    if (level < waterPoint) {
      if(level === 0){
        const timer = setTimeout(() => {
          setLevel((prevLevel) => prevLevel + 1);
        }, 0); 
        return () => clearTimeout(timer); 
      }else{
        const timer = setTimeout(() => {

          setLevel((prevLevel) => prevLevel + 1);
        }, 1000);
        return () => clearTimeout(timer); 
      }

    }
  }, [level, waterPoint]);

  useEffect(() => {
    const flowers = document.querySelectorAll(".background > .flower");
  
    if (flowers.length > 0 && level >= 6) {
      const sceneTree = new Scene(
        {
          ".background>.flower": function (i:any) {
            return {
              0: {opacity: 0, transform: "translateY(0px) rotate(0deg)"},
              1: {opacity: 1},
              4: {opacity: 1},
              5: {opacity: 0, transform: "translateY(300px) rotate(360deg)"},
              options: {
                delay: 2 + i,
                iterationCount: "infinite"
              },
            };
          },
        },
        {
          selector: true,
        }
      );
      sceneTree.playCSS();
    } else if (flowers.length > 0) {
      const sceneTree = new Scene(
        {
          ".background>.flower": function (i:any) {
            return {
              0: {opacity: 0, transform: "translateY(0px) rotate(0deg)"}
            };
          },
        },
        {
          selector: true,
        }
      );
      sceneTree.playCSS();
    }
  }, [level]);
  
 
  useEffect(() => {
    if (level === 1) {
      const sceneTree = new Scene(
        {
          ".tree": {
            0: { transform: "scale(0)" },
            1: { transform: "scale(1)" },
          },
        },
        {
          selector: true,
        }
      );

      sceneTree.playCSS();
    }
  }, [level]); 

  useEffect(() => {
    if (level === 2) {
      const sceneTree = new Scene({}, { selector: true });
      const branchs = document.querySelectorAll(
        ".branch1, .branch1 .branch-inner, .branch1 .leaf, .branch1 .flower1, .branch1 .branch-inner1, .branch1 .branch-inner2, .branch1 .branch-inner3"
      );
  
      const depths = [0, 0, 0];
  
      for (let i = 0; i < branchs.length; ++i) {
        const sceneItem = sceneTree.newItem("item2" + i); 
        const className = branchs[i].className;
  
        if (className.includes("branch-inner")) {
          ++depths[1];
          depths[2] = 0;
        } else if (className.includes("branch")) {
          ++depths[0];
          depths[1] = 0;
          depths[2] = 0;
        } else if (className.includes("leaf") || className.includes("flower1")) {
          ++depths[2];
        }
        sceneItem.setElement(branchs[i]);
        sceneItem.setCSS(0, ["transform"]);
  
        const time = depths[0] * 0.5 + depths[1] * 0.5 + depths[2] * 0.5;
        sceneItem.set(time, "transform", "scale", 0); 
        sceneItem.set(time + 1, "transform", "scale", 1);
      }
  
      
      sceneTree.playCSS(); 

      
    }
  }, [level]);
  
  useEffect(() => {
    if (level === 3) {
      const sceneTree = new Scene({}, { selector: true });
      const branchs = document.querySelectorAll(
        ".branch2, .branch2 .branch-inner, .branch2 .leaf, .branch2 .flower1, .branch2 .branch-inner1, .branch2 .branch-inner2, .branch2 .branch-inner3, .branch2 .branch-inner4"
      );
      const depths = [0, 0, 0];
  
      for (let i = 0; i < branchs.length; ++i) {
        const sceneItem = sceneTree.newItem("item3-" + i); 
        const className = branchs[i].className;
  
        if (className.includes("branch-inner")) {
          ++depths[1];
          depths[2] = 0;
        } else if (className.includes("branch")) {
          ++depths[0];
          depths[1] = 0;
          depths[2] = 0;
        } else if (className.includes("leaf") || className.includes("flower1")) {
          ++depths[2];
        }
        sceneItem.setElement(branchs[i]);
        sceneItem.setCSS(0, ["transform"]);
  
        const time = depths[0] * 0.5 + depths[1] * 0.5 + depths[2] * 0.5;
        sceneItem.set(time, "transform", "scale", 0);
        sceneItem.set(time + 1, "transform", "scale", 1);
      }
  
      sceneTree.playCSS(); 
    }
  }, [level]);
  
  useEffect(() => {
    if (level === 4) {
      const sceneTree = new Scene({}, { selector: true });
      const branchs = document.querySelectorAll(".branch3, .branch3 .branch-inner, .branch3 .leaf, .branch3 .flower1, .branch3 .branch-inner1, .branch3 .branch-inner2");
      const depths = [0, 0, 0];
  
      for (let i = 0; i < branchs.length; ++i) { 
        const sceneItem = sceneTree.newItem("item4-" + i);
        const className = branchs[i].className;
  
        if (className.includes("branch-inner")) {
          ++depths[1];
          depths[2] = 0;
        } else if (className.includes("branch")) {
          ++depths[0];
          depths[1] = 0;
          depths[2] = 0;
        } else if (className.includes("leaf") || className.includes("flower1")) {
          ++depths[2];
        }
        sceneItem.setElement(branchs[i]);
        sceneItem.setCSS(0, ["transform"]);
  
        const time = depths[0] * 0.5 + depths[1] * 0.5 + depths[2] * 0.5;
        sceneItem.set(time, "transform", "scale", 0);
        sceneItem.set(time + 1, "transform", "scale", 1);
      }
  
      sceneTree.playCSS(); 
    }
  }, [level]);
  
  useEffect(() => {
    if (level === 5) {
      const sceneTree = new Scene({}, { selector: true });
      const branchs = document.querySelectorAll(".branch4, .branch4 .branch-inner, .branch4 .leaf, .branch4 .flower1, .branch4 .branch-inner1, .branch4 .branch-inner2");
  
      const depths = [0, 0, 0];
  
      for (let i = 0; i < branchs.length; ++i) {
        const sceneItem = sceneTree.newItem("item5-" + i); 
        const className = branchs[i].className;
  
        if (className.includes("branch-inner")) {
          ++depths[1];
          depths[2] = 0;
        } else if (className.includes("branch")) {
          ++depths[0];
          depths[1] = 0;
          depths[2] = 0;
        } else if (className.includes("leaf") || className.includes("flower1")) {
          ++depths[2];
        }
        sceneItem.setElement(branchs[i]);
        sceneItem.setCSS(0, ["transform"]);
  
        const time = depths[0] * 0.5 + depths[1] * 0.5 + depths[2] * 0.5;
        sceneItem.set(time, "transform", "scale", 0);
        sceneItem.set(time + 1, "transform", "scale", 1);
      }
  
      sceneTree.playCSS(); 
    }
  }, [level]);
  
  useEffect(() => {
    if (level === 6) {
      const sceneTree = new Scene({}, { selector: true });
      const branchs = document.querySelectorAll(".branch5, .branch5 .branch-inner, .branch5 .leaf, .branch5 .flower1, .branch5 .branch-inner1, .branch5 .branch-inner2");
  
      const depths = [0, 0, 0];
  
      for (let i = 0; i < branchs.length; ++i) {
        const sceneItem = sceneTree.newItem("item6-" + i); 
        const className = branchs[i].className;
  
        if (className.includes("branch-inner")) {
          ++depths[1];
          depths[2] = 0;
        } else if (className.includes("branch")) {
          ++depths[0];
          depths[1] = 0;
          depths[2] = 0;
        } else if (className.includes("leaf") || className.includes("flower1")) {
          ++depths[2];
        }
        sceneItem.setElement(branchs[i]);
        sceneItem.setCSS(0, ["transform"]);
  
        const time = depths[0] * 0.5 + depths[1] * 0.5 + depths[2] * 0.5;
        sceneItem.set(time, "transform", "scale", 0);
        sceneItem.set(time + 1, "transform", "scale", 1);
      }
  
      sceneTree.playCSS(); 
    }
  }, [level]);


  const handleButtonClick = async () => {
    try {
      const response = await instance.put(`/tree/water`);
      const { count, badgeNum, newTree } = response.data;
  
      toast.success("물을 주었습니다.");
      const newLevel = count / 500;
      setLevel(newLevel); 
  
      if (newTree) {
        setNewTreeNumber(badgeNum);  // treeNum 상태 저장
        setTimeout(() => openNewTreeModal(), 0);  // Modal4 열기
      }      
    } catch (error) {
      console.error("Failed to send watering request:", error);
      toast.error("포인트가 부족합니다.");
    }
  };

  const toggleDarkMode = () => {
    setIsDark((prev) => !prev); 
  };


  const resetTree = () => {
    setWaterPoint(0);
    setLevel(0);
  };

  // useEffect(() => {
  // }, [level, waterPoint]);

  

  return (
    <div>

<div className="">
<ToastContainer draggable  theme="light"  position="top-center" autoClose={1000}  className="mt-10"/> 
  
{isClient && (
      <div className={isDark ? 'dark' : ''}>
        <div className="scene">
          <div className="sun" onClick={toggleDarkMode}></div>
        </div>
      </div>
    )}
<div className="background overflow-hidden">
        {level >= 6 && (
      <div className="background">
  <div className="flower roundpetal petal5 flower1">
    <div className="petal">
      <div className="petal">
        <div className="petal">
        </div>
      </div>
    </div>
  </div>
  <div className="flower roundpetal petal5 flower2 blueflower">
    <div className="petal">
      <div className="petal">
        <div className="petal">
        </div>
      </div>
    </div>
  </div>
  <div className="flower roundpetal petal5 flower3 yellowflower">
    <div className="petal">
      <div className="petal">
        <div className="petal">
        </div>
      </div>
    </div>
  </div>
  <div className="flower roundpetal petal5 flower4 purpleflower">
    <div className="petal">
      <div className="petal">
        <div className="petal">
        </div>
      </div>
    </div>
  </div>
        </div>    
        )}
  <div className="slope"></div>
  
 
 
  {level >= 1 && (
            <div className="tree">
              {level >= 2 && (
                <>
                  <div className="branch left branch1">
                    <div className="branch left branch-inner1">
                      <div className="leaf leaf1"></div>
                      <div className="leaf leaf2"></div>
                      <div className="leaf leaf3"></div>
                      <div className="heart flower1 blueflower"></div>
                    </div>
                    <div className="branch left branch-inner2">
                      <div className="leaf leaf1"></div>
                      <div className="leaf leaf2"></div>
                      <div className="leaf leaf3"></div>
                      <div className="tulip flower1 redflower">
                        <div className="peak"></div>
                      </div>
                    </div>
                    <div className="branch left branch-inner3">
                      <div className="leaf leaf1"></div>
                      <div className="leaf leaf2"></div>
                    </div>
                    <div className="flower petal5 flower1 redflower">
                      <div className="petal">
                        <div className="petal">
                          <div className="petal"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {level >= 3 && (
                <>
                  <div className="branch right branch2">
                    <div className="branch left branch-inner1">
                      <div className="leaf leaf1"></div>
                      <div className="leaf leaf2"></div>
                      <div className="leaf leaf3"></div>
                      <div className="flower petal5 flower1 blueflower">
                        <div className="petal">
                          <div className="petal">
                            <div className="petal"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="branch right branch-inner2">
                      <div className="leaf leaf1"></div>
                      <div className="leaf leaf2"></div>
                      <div className="leaf leaf3"></div>
                      <div className="tulip flower1 greenflower">
                        <div className="peak"></div>
                      </div>
                    </div>
                    <div className="branch right branch-inner3">
                      <div className="leaf leaf1"></div>
                      <div className="leaf leaf2"></div>
                      <div className="leaf leaf3"></div>
                      <div className="branch left branch-inner4">
                        <div className="leaf leaf1"></div>
                        <div className="flower petal5 flower1 yellowflower">
                          <div className="petal">
                            <div className="petal">
                              <div className="petal"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="tulip flower1 purpleflower">
                        <div className="peak"></div>
                      </div>
                    </div>
                    <div className="flower petal5 roundpetal flower1">
                      <div className="petal">
                        <div className="petal">
                          <div className="petal">
                            <div className="petal"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {level >= 4 && (
                <>
                  <div className="branch left branch3">
                    <div className="branch right branch-inner1">
                      <div className="leaf leaf1"></div>
                      <div className="leaf leaf2"></div>
                      <div className="leaf leaf3"></div>
                      <div className="heart flower1"></div>
                    </div>
                    <div className="branch left branch-inner2">
                      <div className="leaf leaf1"></div>
                      <div className="leaf leaf2"></div>
                      <div className="leaf leaf3"></div>
                      <div className="tulip flower1">
                        <div className="peak"></div>
                      </div>
                    </div>
                    <div className="leaf leaf1"></div>
                    <div className="leaf leaf2"></div>
                    <div className="flower roundpetal petal5 flower1 purpleflower">
                      <div className="petal">
                        <div className="petal">
                          <div className="petal"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {level >= 5 && (
                <>
                  <div className="branch right branch4">
                    <div className="branch left branch-inner1">
                      <div className="leaf leaf1"></div>
                      <div className="leaf leaf2"></div>
                      <div className="leaf leaf3"></div>
                      <div className="flower petal5 flower1 yellowflower">
                        <div className="petal">
                          <div className="petal">
                            <div className="petal"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="branch right branch-inner2">
                      <div className="leaf leaf1"></div>
                      <div className="leaf leaf2"></div>
                      <div className="leaf leaf3"></div>
                      <div className="tulip tulip1 flower1 purpleflower">
                        <div className="peak"></div>
                      </div>
                    </div>
                    <div className="flower petal5 roundpetal flower1">
                      <div className="petal">
                        <div className="petal">
                          <div className="petal">
                            <div className="petal"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {level >= 6 && (
                <>
                  <div className="branch left branch5">
                    <div className="branch right branch-inner1">
                      <div className="leaf leaf1"></div>
                      <div className="leaf leaf2"></div>
                      <div className="leaf leaf3"></div>
                      <div className="heart flower1"></div>
                    </div>
                    <div className="branch left branch-inner2">
                      <div className="leaf leaf1"></div>
                      <div className="leaf leaf2"></div>
                      <div className="leaf leaf3"></div>
                      <div className="tulip flower1 greenflower">
                        <div className="peak"></div>
                      </div>
                    </div>
                    <div className="flower roundpetal petal5 flower1 blueflower">
                      <div className="petal">
                        <div className="petal">
                          <div className="petal"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

</div>

      </div>
      <div className="flex flex-col absolute buttonGroup">
      <button className="info-button" onClick={openModal2}>
      <BiInfoCircle />
      </button>
      <button className="dogam-button" onClick={openDogamModal}>
      <BiBookOpen />
      </button>
      {level >= 6 || waterPoint >= 6 ? (
      <button className="receiveButton" onClick={openModal} >
      <BiGift  />
      </button> 
       ) : (
        <button className="pouringWater " onClick={handleButtonClick}>
        <BiCloudRain />
        </button>     )}
      </div>
      {isModalOpen && <Modal onClose={closeModal} onResetTree={resetTree} />}
      {isModal2Open && <Modal2 onClose={closeModal2} />}
      {isDogamModalOpen && <Modal3 onClose={closeDogamModal} />}
      {isNewTreeModalOpen && <Modal4 onClose={closeNewTreeModal} treeNum={newTreeNumber} />}
    </div>
  );
};

export default Tree;
