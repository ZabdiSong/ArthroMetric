import streamlit as st

# Clear the page
st.empty()

# First question
answer1 = st.selectbox("Is the body devided into parts/segments?", ("Yes", "No"))

if answer1 == "NO":
    st.empty()
    st.write("This is a crustacean")
elif answer1 == "Yes":
    st.empty()
    # Second question
    answer2 = st.selectbox("Does it have antennae(s) or not", ("Yes", "No"))

    if answer1 == "No":
        st.empty()
        st.write("This is arachnid")
    elif answer2 =="Yes":
        st.empty()
        # Third question
        answer3 = st.selectbox("Does it have wings or not", ("Yes", "No"))

        if answer3 == "Yes":
            st.empty()
            st.write("This is an insect")
        elif answer3 == "No":
            st.empty()
            st.write("This is a myriapod")