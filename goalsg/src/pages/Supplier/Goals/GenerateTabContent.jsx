import React, { useEffect, useCallback } from "react";
import Addbtn from "../../../components/common/Button/Addbtn";
import Deletebtn from "../../../components/common/Button/Deletebtn";
import { QuestionGenerator } from "./QuestionGenerator";
import { useDispatch, useSelector } from "react-redux";
import {
  setFormData,
  addDynamicQuestion,
  removeDynamicQuestion,
} from "../../../redux/slices/goalsSlice";
import StyledCard from "../../../components/common/StyledCard"; // Import StyledCard

const GenerateTabContent = ({ Data }) => {
  const dispatch = useDispatch();
  const { pillarsData } = useSelector((state) => state.goals);

  const pillarData = pillarsData?.find(
    (data) => Data.pillarName === data.pillarName
  );
  const goalAnswers = pillarData?.goalAnswers || [];

  const handleInputChange = useCallback(
    (pillarName, questionId, inputId, value) => {
      dispatch(setFormData({ pillarName, questionId, inputId, value }));
    },
    [dispatch]
  );

  const handleAddQuestion = (pillarName, question, questionId, index) => {
    dispatch(addDynamicQuestion({ pillarName, question, questionId, index }));
  };

  const handleDeleteQuestion = (pillarName, questionId) => {
    dispatch(removeDynamicQuestion({ pillarName, questionId }));
  };

  const normalizeQuestionId = (questionId) => {
    return questionId.slice(0, 9);
  };

  const QuestionContent = (Data) => {
    const allQuestions = [...Data.questions, ...Data.dynamicQuestions].sort((a, b) =>
      a.questionId.localeCompare(b.questionId)
    );

    if (!pillarData) {
      return Data.questions.map((question, index) => (
        <StyledCard key={question.questionId}> 
          <div className="w-auto mb-[40px]  flex p-4">
            <div className="flex-1 ml-5 mr-15 flex mb-[32px]  items-start">
              <div>
                <QuestionGenerator
                  text={question.text}
                  inputFields={question.inputFields}
                  handleInputChange={handleInputChange}
                  pillarName={Data.pillarName}
                  answer={{ questionId: question.questionId, response: [] }}
                />
              </div>
              <Addbtn
                onClick={() =>
                  handleAddQuestion(
                    Data.pillarName,
                    question,
                    question.questionId,
                    index
                  )
                }
              />
              <Deletebtn
                onClick={() =>
                  handleDeleteQuestion(Data.pillarName, question.questionId)
                }
                disabled={!question.isDynamic}
              />
            </div>
          </div>
        </StyledCard>
      ));
    }

    return allQuestions?.map((question) => {
      let lo = goalAnswers.filter((answer) =>
        answer.questionId.includes(question.questionId)
      );

      return lo.length
        ? lo?.map((answer) => {
            const normalizedAnswerQuestionId = normalizeQuestionId(
              answer.questionId
            );

            return (
              normalizedAnswerQuestionId === question.questionId && (
                <StyledCard key={question.questionId}> 
                  <div className="w-auto mb-3  flex ">
                    <div className="flex-1 ml-5 mr-15 flex justify-between items-start">
                      <div>
                        <QuestionGenerator
                          text={question.text}
                          inputFields={question.inputFields}
                          handleInputChange={handleInputChange}
                          pillarName={Data.pillarName}
                          answer={answer}
                        />
                      </div>
                      <div>
                      <Addbtn
                        onClick={() =>
                          handleAddQuestion(
                            Data.pillarName,
                            question,
                            answer.questionId
                          )
                        }
                      />
                      <Deletebtn
                        onClick={() =>
                          handleDeleteQuestion(
                            Data.pillarName,
                            answer.questionId
                          )
                        }
                        disabled={!question.isDynamic}
                      />
                      </div>
                    </div>
                  </div>
                </StyledCard>
              )
            );
          })
        : (
          <StyledCard key={question.questionId}> {/* Wrap question block in StyledCard */}
            <div className="w-auto mb-3 mt-3 flex p-4">
              <div className="flex-1 ml-5 mr-15 flex justify-between items-start">
                <div>
                  <QuestionGenerator
                    text={question.text}
                    inputFields={question.inputFields}
                    handleInputChange={handleInputChange}
                    pillarName={Data.pillarName}
                    answer={{ questionId: question.questionId, response: [] }} // Dummy response
                  />
                </div>
                <Addbtn
                  onClick={() =>
                    handleAddQuestion(
                      Data.pillarName,
                      question,
                      question.questionId
                    )
                  }
                />
                <Deletebtn
                  onClick={() =>
                    handleDeleteQuestion(Data.pillarName, question.questionId)
                  }
                  disabled={!question.isDynamic}
                />
              </div>
            </div>
          </StyledCard>
        );
    });
  };

  useEffect(() => {
    console.log(pillarsData);
  }, [pillarsData]);

  return <>{QuestionContent(Data)}</>;
};

export default React.memo(GenerateTabContent);




























// import React, { useEffect, useCallback } from "react";
// import Addbtn from "../../../components/common/Button/Addbtn";
// import Deletebtn from "../../../components/common/Button/Deletebtn";
// import { QuestionGenerator } from "./QuestionGenerator";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   setFormData,
//   addDynamicQuestion,
//   removeDynamicQuestion,
// } from "../../../redux/slices/goalsSlice";

// const GenerateTabContent = ({ Data }) => {
//   const dispatch = useDispatch();
//   const { pillarsData } = useSelector((state) => state.goals);

//   // Find pillar data for the current tab
//   const pillarData = pillarsData?.find(
//     (data) => Data.pillarName === data.pillarName
//   );
//   const goalAnswers = pillarData?.goalAnswers || [];

//   const handleInputChange = useCallback(
//     (pillarName, questionId, inputId, value) => {
//       dispatch(setFormData({ pillarName, questionId, inputId, value }));
//     },
//     [dispatch]
//   );

//   const handleAddQuestion = (pillarName, question, questionId) => {
//     dispatch(addDynamicQuestion({ pillarName, question, questionId }));
//   };

//   const handleDeleteQuestion = (pillarName, questionId) => {
//     dispatch(removeDynamicQuestion({ pillarName, questionId }));
//   };

//   const normalizeQuestionId = (questionId) => {
//     return questionId.slice(0, 9);
//   };

//   const QuestionContent = (Data) => {
//     // Merge existing questions with dynamic questions
//     const allQuestions = [...Data.questions, ...Data.dynamicQuestions];

//     // If no pillar data exists, generate empty inputs from goalsData
//     if (!pillarData) {
//       return Data.questions.map((question) => (
//         <div key={question.questionId} className="w-auto mb-3 mt-3 flex p-4">
//           <div className="flex-1 ml-5 mr-15 flex justify-between items-start">
//             <div>
//               <QuestionGenerator
//                 text={question.text}
//                 // inputFields={question.inputFields.map((field) => ({
//                 //   ...field,
//                 //   value: "", // Set default empty value
//                 // }))}
//                 inputFields={question.inputFields}
//                 handleInputChange={handleInputChange}
//                 pillarName={Data.pillarName}
//                 answer={{ questionId: question.questionId, response: [] }} // Dummy response
//               />
//             </div>
//             <Addbtn
//               onClick={() =>
//                 handleAddQuestion(
//                   Data.pillarName,
//                   question,
//                   question.questionId
//                 )
//               }
//             />
//             <Deletebtn
//               onClick={() =>
//                 handleDeleteQuestion(Data.pillarName, question.questionId)
//               }
//               disabled={!question.isDynamic}
//             />
//           </div>
//         </div>
//       ));
//     }

//     // If pillar data exists, render questions with existing answers

  
//     return allQuestions?.map((question) => {
//       let lo=goalAnswers.filter((answer)=>answer.questionId.includes(question.questionId))
    
//       console.log("dsd",lo.length);
//       return lo.length?
//        lo?.map((answer) => {
//         const normalizedAnswerQuestionId = normalizeQuestionId(
//           answer.questionId
//         );
      
//         return (
//           normalizedAnswerQuestionId === question.questionId && (
//             <div
//               key={question.questionId}
//               className="w-auto mb-3 mt-3 flex p-4"
//             >
//               <div className="flex-1 ml-5 mr-15 flex justify-between items-start">
//                 <div>
//                   <QuestionGenerator
//                     text={question.text}
//                     inputFields={question.inputFields}
//                     handleInputChange={handleInputChange}
//                     pillarName={Data.pillarName}
//                     answer={answer}
//                   />
//                 </div>
//                 <Addbtn
//                   onClick={() =>
//                     handleAddQuestion(
//                       Data.pillarName,
//                       question,
//                       answer.questionId
//                     )
//                   }
//                 />
//                 <Deletebtn
//                   onClick={() =>
//                     handleDeleteQuestion(Data.pillarName, answer.questionId)
//                   }
//                   disabled={!question.isDynamic}
//                 />
//               </div>
//             </div>
//           )
//         );
//       }):<div key={question.questionId} className="w-auto mb-3 mt-3 flex p-4">
//       <div className="flex-1 ml-5 mr-15 flex justify-between items-start">
//         <div>
//           <QuestionGenerator
//             text={question.text}
//             // inputFields={question.inputFields.map((field) => ({
//             //   ...field,
//             //   value: "", // Set default empty value
//             // }))}
//             inputFields={question.inputFields}
//             handleInputChange={handleInputChange}
//             pillarName={Data.pillarName}
//             answer={{ questionId: question.questionId, response: [] }} // Dummy response
//           />
//         </div>
//         <Addbtn
//           onClick={() =>
//             handleAddQuestion(
//               Data.pillarName,
//               question,
//               question.questionId
//             )
//           }
//         />
//         <Deletebtn
//           onClick={() =>
//             handleDeleteQuestion(Data.pillarName, question.questionId)
//           }
//           disabled={!question.isDynamic}
//         />
//       </div>
//     </div>
//     });
//   };

//   useEffect(() => {
//     console.log(pillarsData);
//   }, [pillarsData]);

//   return <>{QuestionContent(Data)}</>;
// };

// export default React.memo(GenerateTabContent);
