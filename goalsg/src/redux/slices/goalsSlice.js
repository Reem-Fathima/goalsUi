import { createSlice } from "@reduxjs/toolkit";

const goalsSlice = createSlice({
  name: "goals",
  initialState: {
    activeTabKey: null,
    goalsData: [],
    isSaved: false,
    formData: {},
    pillarsData: [],
    idCounter: 1,
  },
  reducers: {
    setPillarsData(state, action) {
      state.pillarsData = action.payload;
    },
    setActiveTabKey(state, action) {
      state.activeTabKey = action.payload;
    },
    setgoalsData(state, action) {
      state.goalsData = action.payload.map((goal) => ({
        ...goal,
        dynamicQuestions: [],
      }));
      const energyTab = action.payload.find(
        (data) => data.pillarName === "Energy"
      );
      state.activeTabKey = energyTab.pillarName;
    },

    setIsSaved(state, action) {
      state.isSaved = action.payload;
    },

    addDynamicQuestion(state, action) {
      const { pillarName, question, questionId, index } = action.payload;

      const goal = state.goalsData.find((g) => g.pillarName === pillarName);
      if (goal) {
        goal.dynamicQuestions.push({
          ...question,
          questionId: `${questionId}_${state.idCounter}`,
          isDynamic: true,
        });
      }
      state.idCounter += 1;
    },

    removeDynamicQuestion(state, action) {
      const { pillarName, questionId } = action.payload;

      const goal = state.goalsData.find((g) => g.pillarName === pillarName);
      if (goal) {
        // Remove the specific dynamic question by its unique questionId
        goal.dynamicQuestions = goal.dynamicQuestions.filter(
          (q) => q.questionId !== questionId
        );

        // Also remove from pillarsData (if it exists in pillar's goalAnswers)
        const pillar = state.pillarsData.find(
          (p) => p.pillarName === pillarName
        );
        if (pillar) {
          pillar.goalAnswers = pillar.goalAnswers.filter(
            (q) => q.questionId !== questionId
          );
        }
      }
    },

    setFormData(state, action) {
      const { pillarName, questionId, inputId, value } = action.payload;

      const currentDate = new Date().toISOString().split("T")[0];
      const currentUser = "ayush";

      let pillar = state.pillarsData.find(
        (item) => item.pillarName === pillarName
      );

      if (!pillar) {
        console.warn(
          `Pillar "${pillarName}" does not exist. Creating a new pillar.`
        );
        pillar = {
          supplierId: "102",
          year: "2024",
          pillarName: pillarName,
          goalAnswers: [],
          updatedDt: currentDate,
          updatedUser: currentUser,
        };
        state.pillarsData.push(pillar);
      }

      let question = pillar.goalAnswers.find(
        (q) => q.questionId === questionId
      );

      if (!question) {
        console.warn(
          `Question "${questionId}" does not exist in pillar "${pillarName}". Creating a new question.`
        );
        question = {
          questionId: questionId,
          response: [],
        };
        pillar.goalAnswers.push(question);
      }

      let field = question.response.find((f) => f.fieldId === inputId);

      if (!field) {
        console.warn(
          `Field "${inputId}" does not exist in question "${questionId}". Creating a new field.`
        );
        field = {
          fieldId: inputId,
          value: value,
        };
        question.response.push(field);
      } else {
        field.value = value;
      }

      console.log(
        `Updated value in pillar "${pillarName}", question "${questionId}", field "${inputId}" to "${value}"`
      );
    },
  },
});

export const {
  setActiveTabKey,
  setgoalsData,
  setIsSaved,
  setFormData,
  setPillarsData,
  addDynamicQuestion,
  removeDynamicQuestion,
} = goalsSlice.actions;
export default goalsSlice.reducer;

// function handleInputChange(pillarName, questionId, fieldId, newValue) {
//   // Data array containing supplier information (the one you provided earlier)
//   const data = [
//     {
//       "supplierId": "101",
//       "year": "2024",
//       "pillarName": "Energy",
//       "goalAnswers": [
//         {
//           "questionId": "qstn_id_1",
//           "response": [
//             { "fieldId": "field_id_1", "value": "67" },
//             { "fieldId": "field_id_2", "value": "Supplychain" },
//             { "fieldId": "field_id_3", "value": "2024" }
//           ]
//         },
//         {
//           "questionId": "qstn_id_2",
//           "response": [
//             { "fieldId": "field_id_1", "value": "Hydropower" },
//             { "fieldId": "field_id_2", "value": "business" },
//             { "fieldId": "field_id_3", "value": "897" },
//             { "fieldId": "field_id_4", "value": "2026" }
//           ]
//         },
//         {
//           "questionId": "qstn_id_3",
//           "response": [
//             { "fieldId": "field_id_1", "value": "78" },
//             { "fieldId": "field_id_2", "value": "2029" }
//           ]
//         }
//       ],
//       "updatedDt": "19-09-2024",
//       "updatedUser": "tej",
//       "_class": "com.project.sustainability.model.goals.Goal"
//     },
//     {
//       "supplierId": "101",
//       "year": "2024",
//       "pillarName": "Packaging",
//       "goalAnswers": [
//         {
//           "questionId": "qstn_id_1",
//           "response": [
//             { "fieldId": "field_id_1", "value": "67" },
//             { "fieldId": "field_id_2", "value": "PVC" },
//             { "fieldId": "field_id_3", "value": "2024" }
//           ]
//         },
//         {
//           "questionId": "qstn_id_2",
//           "response": [
//             { "fieldId": "field_id_1", "value": "78" },
//             { "fieldId": "field_id_2", "value": "plastic" },
//             { "fieldId": "field_id_3", "value": "8907" }
//           ]
//         },
//         {
//           "questionId": "qstn_id_3",
//           "response": [
//             { "fieldId": "field_id_1", "value": "78" },
//             { "fieldId": "field_id_2", "value": "2029" }
//           ]
//         }
//       ],
//       "updatedDt": "19-09-2024",
//       "updatedUser": "tej",
//       "_class": "com.project.sustainability.model.goals.Goal"
//     },
//     {
//       "supplierId": "101",
//       "year": "2024",
//       "pillarName": "Waste",
//       "goalAnswers": [
//         {
//           "questionId": "qstn_id_1",
//           "response": [
//             { "fieldId": "field_id_1", "value": "67" },
//             { "fieldId": "field_id_2", "value": "Plastic" },
//             { "fieldId": "field_id_3", "value": "2024" }
//           ]
//         },
//         {
//           "questionId": "qstn_id_2",
//           "response": [
//             { "fieldId": "field_id_1", "value": "78" },
//             { "fieldId": "field_id_2", "value": "7889" }
//           ]
//         }
//       ],
//       "updatedDt": "19-09-2024",
//       "updatedUser": "tej",
//       "_class": "com.project.sustainability.model.goals.Goal"
//     }
//   ];

// // Iterate through each item in the array
// for (let i = 0; i < data.length; i++) {
//   // Check if the current item matches the given pillarName
//   if (data[i].pillarName === pillarName) {
//     // Find the correct question using questionId
//     const goalAnswers = data[i].goalAnswers;
//     for (let j = 0; j < goalAnswers.length; j++) {
//       if (goalAnswers[j].questionId === questionId) {
//         // Find the correct field using fieldId and update its value
//         const response = goalAnswers[j].response;
//         for (let k = 0; k < response.length; k++) {
//           if (response[k].fieldId === fieldId) {
//             // Update the value
//             response[k].value = newValue;
//             console.log(`Updated value in pillar "${pillarName}", question "${questionId}", field "${fieldId}" to "${newValue}"`);
//             return; // Exit once the value is updated
//           }
//         }
//       }
//     }
//   }
// }

//   console.log("No matching record found to update.");
// }

// import { createSlice } from '@reduxjs/toolkit';

// const goalsSlice = createSlice({
//   name: 'goals',
//   initialState: {
//     activeTabKey: null,
//     goalsData: [],
//     isSaved: false,
//     formData: {},
//   },
//   reducers: {
//     setActiveTabKey(state, action) {
//       state.activeTabKey = action.payload;
//     },
//     setgoalsData(state, action) {
//       state.goalsData = action.payload.map(goal => ({
//         ...goal,
//         dynamicQuestions: [], // Initialize dynamic questions
//       }));
//       const energyTab = action.payload.find(data => data.pillarName === 'Energy');
//       state.activeTabKey = energyTab.pillarName;
//     },
//     setIsSaved(state, action) {
//       state.isSaved = action.payload;
//     },
//     setFormData: (state, action) => {
//       const { pillarName, questionId, inputId, value } = action.payload;
//       if (!state.formData[pillarName]) {
//         state.formData[pillarName] = {};
//       }
//       if (!state.formData[pillarName][questionId]) {
//         state.formData[pillarName][questionId] = {};
//       }
//       state.formData[pillarName][questionId][inputId] = value;
//     },
//     addDynamicQuestion(state, action) {
//       const { pillarName, question } = action.payload;
//       const goal = state.goalsData.find(g => g.pillarName === pillarName);
//       if (goal) {
//         goal.dynamicQuestions.push({ ...question, questionId: Date.now(), isDynamic: true });
//       }
//     },
//     removeDynamicQuestion(state, action) {
//       const { pillarName, questionId } = action.payload;
//       const goal = state.goalsData.find(g => g.pillarName === pillarName);
//       if (goal) {
//         goal.dynamicQuestions = goal.dynamicQuestions.filter(q => q.questionId !== questionId);
//       }
//     },
//   },
// });

// export const { setActiveTabKey, setgoalsData, setIsSaved, setFormData, addDynamicQuestion, removeDynamicQuestion } = goalsSlice.actions;
// export default goalsSlice.reducer;

