'use client';

import React, { useEffect } from "react";
import "./Tree.css";
import Scene from "scenejs"; 

const Tree = () => {
  
  useEffect(() => {
    const sceneTree = new Scene({
      ".tree": {
        0: { transform: "scale(0)" },
        1.5: { transform: "scale(1)" }
      },
      ".background>.flower": function (i: any) {
        return {
          0: { opacity: 0, transform: "translateY(0px) rotate(0deg)" },
          1: { opacity: 1 },
          4: { opacity: 1 },
          5: { opacity: 0, transform: "translateY(300px) rotate(360deg)" },
          options: {
            delay: 7 + i,
            iterationCount: "infinite"
          },
        };
      },
    }, {
      selector: true
    });

    const branchs = document.querySelectorAll(".tree .branch, .tree .leaf, .tree .flower1");
    let depths = [0, 0, 0];

    for (let i = 0; i < branchs.length; ++i) {
      const sceneItem = sceneTree.newItem("item" + i);
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

      const time = 1 + depths[0] * 0.5 + depths[1] * 0.5 + depths[2] * 0.5;
      sceneItem.set(time, "transform", "scale", 0);
      sceneItem.set(time + 1, "transform", "scale", 1);
    }

    sceneTree.playCSS();
  }, []);


  return (
    
      <div className="mt-96">
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
  <div className="slope"></div>
  <div className="tree">
    <div className="leaf leaf1"></div>
    <div className="leaf leaf2"></div>


    <div className="branch left branch1">
      <div className="branch left branch-inner1">
        <div className="leaf leaf1"></div>
        <div className="leaf leaf2"></div>                
        <div className="leaf leaf3"></div>
        <div className="heart flower1 blueflower">
        </div>
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
            <div className="petal">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="branch right branch2">
      <div className="branch left branch-inner1">
        <div className="leaf leaf1"></div>
        <div className="leaf leaf2"></div>        
        <div className="leaf leaf3"></div>
        <div className="flower petal5 flower1 blueflower">
          <div className="petal">
            <div className="petal">
              <div className="petal">
              </div>
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
                <div className="petal">
                </div>
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
              <div className="petal">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="branch left branch3">
      <div className="branch right branch-inner1">
        <div className="leaf leaf1"></div>
        <div className="leaf leaf2"></div>                
        <div className="leaf leaf3"></div>
        <div className="heart flower1">
        </div>
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
            <div className="petal">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="branch right branch4">
      <div className="branch left branch-inner1">
        <div className="leaf leaf1"></div>
        <div className="leaf leaf2"></div>        
        <div className="leaf leaf3"></div>
        <div className="flower petal5 flower1 yellowflower">
          <div className="petal">
            <div className="petal">
              <div className="petal">
              </div>
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
              <div className="petal">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="branch left branch5">
      <div className="branch right branch-inner1">
        <div className="leaf leaf1"></div>
        <div className="leaf leaf2"></div>                
        <div className="leaf leaf3"></div>
        <div className="heart flower1">
        </div>
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
            <div className="petal">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

      </div>
  );
};

export default Tree;
