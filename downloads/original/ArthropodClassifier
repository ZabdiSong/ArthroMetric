import streamlit as st
st.markdown('Streamlit Demo')

def main():
    st.title("Arthropod Classifier")

    # First question
    question1 = st.button("Is the body divided into parts/segments?")
    if question1:
        answer1 = st.radio("Yes or No?", ("Yes", "No"))
        if answer1 == "No":
            st.write("This is a crustacean.")
        else:
            # Second question
            question2 = st.button("Does it have antennae(s) or not?")
            if question2:
                answer2 = st.radio("Yes or No?", ("Yes", "No"))
                if answer2 == "No":
                    st.write("This is an arachnid.")
                else:
                    # Third question
                    question3 = st.button("Does it have wings or not?")
                    if question3:
                        answer3 = st.radio("Yes or No?", ("Yes", "No"))
                        if answer3 == "Yes":
                            st.write("This is an insect.")
                        else:
                            st.write("This is a myriapod.")

if __name__ == "__main__":
    main()
