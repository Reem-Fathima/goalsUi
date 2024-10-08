import React from "react";
import { useSelector, useDispatch } from "react-redux";

export const QuestionGenerator = React.memo(
  ({ text, inputFields,  handleInputChange, pillarName,answer }) => {

    
    const dispatch = useDispatch();

    const response = answer
   
    const textParts = text.split(/(<[^>]+>)/g).map((part, index) => {
      const matchedField = inputFields.find(
        (field) => `<${field.inputId}>` === part
      );
      if (matchedField) {
        const { inputId, inputType, options } = matchedField;
        const key = `${answer.questionId}-${inputId}-${index}`;

        const o = response?.["response"].find((data) => {
          return data["fieldId"] == inputId
        })
        const value = o?.["value"] || ""


        if (inputType === "number") {
          return (
            <input
              value={value}
              type="number"
              key={key}
              className="font-semibold text-center mx-1 w-[75px] text-[#014D4E] border-b-[1px] border-dashed border-[#014D4E] mb-[2px]"
              onChange={(e) => {

                handleInputChange(pillarName, answer.questionId, inputId, e.target.value)
              }
              }
            />
          );
        } else if (inputType === "text") {
          return (
            <input
              value={value}
              type="text"
              key={key}
              className="font-semibold text-center mx-1 w-[75px] text-[#014D4E] border-b-[1px] border-dashed border-[#014D4E] mb-[2px]"
              onChange={(e) => {

                handleInputChange(pillarName, answer.questionId, inputId, e.target.value)
              }
              }
            />
          );
        } else if (inputType === "dropdown") {
          return (
            <select
              value={value}
              key={key}
              className="text-center w-[150px] h-[28px] text-[#014D4E] border-b-[1px] border-dashed border-[#014D4E] mb-[2px]"
              onChange={(e) => {

                handleInputChange(pillarName, answer.questionId, inputId, e.target.value)
              }
              }
            >
              <option disabled selected hidden></option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          );
        }
      } else {
        return part;
      }
    });

    return <span>{textParts}</span>;
  }
);












// import React from "react";
// import { useSelector, useDispatch } from "react-redux";

// export const QuestionGenerator = React.memo(
//   ({ text, inputFields,  handleInputChange, pillarName,answer }) => {

    
//     const dispatch = useDispatch();

//     const response = answer
   
//     const textParts = text.split(/(<[^>]+>)/g).map((part, index) => {
//       const matchedField = inputFields.find(
//         (field) => `<${field.inputId}>` === part
//       );
//       if (matchedField) {
//         const { inputId, inputType, options } = matchedField;
//         const key = `${answer.questionId}-${inputId}-${index}`;

//         const o = response?.["response"].find((data) => {
//           return data["fieldId"] == inputId
//         })
//         const value = o?.["value"] || ""


//         if (inputType === "number") {
//           return (
//             <input
//               value={value}
//               type="number"
//               key={key}
//               className="font-semibold text-center mx-1 w-[75px] text-[#014D4E] border-b-[1px] border-dashed border-[#014D4E] mb-[2px]"
//               onChange={(e) => {

//                 handleInputChange(pillarName, answer.questionId, inputId, e.target.value)
//               }
//               }
//             />
//           );
//         } else if (inputType === "text") {
//           return (
//             <input
//               value={value}
//               type="text"
//               key={key}
//               className="font-semibold text-center mx-1 w-[75px] text-[#014D4E] border-b-[1px] border-dashed border-[#014D4E] mb-[2px]"
//               onChange={(e) => {

//                 handleInputChange(pillarName, answer.questionId, inputId, e.target.value)
//               }
//               }
//             />
//           );
//         } else if (inputType === "dropdown") {
//           return (
//             <select
//               value={value}
//               key={key}
//               className="text-center w-[150px] h-[28px] text-[#014D4E] border-b-[1px] border-dashed border-[#014D4E] mb-[2px]"
//               onChange={(e) => {

//                 handleInputChange(pillarName, answer.questionId, inputId, e.target.value)
//               }
//               }
//             >
//               <option disabled selected hidden></option>
//               {options.map((option) => (
//                 <option key={option} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>
//           );
//         }
//       } else {
//         return part;
//       }
//     });

//     return <span>{textParts}</span>;
//   }
// );

