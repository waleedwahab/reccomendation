// import pandas as pd
// import numpy as np
// from sklearn.feature_extraction.text import TfidfVectorizer
// from sklearn.neighbors import NearestNeighbors
// from tabulate import tabulate

dataset = pd.read_csv('../../model/Property_with_Feature_Engineering.csv')

dataset['price'] = dataset['price'].astype(str)
dataset['baths'] = dataset['baths'].astype(str)
dataset['area'] = dataset['area'].astype(str)
dataset['bedrooms'] = dataset['bedrooms'].astype(str)

dataset['content'] = dataset['property_type'] + ' ' + dataset['price'].astype(str) + ' ' + dataset['location'] + ' ' + dataset['baths'].astype(str) + ' ' + dataset['area'].astype(str) + ' ' + dataset['purpose'] + ' ' + dataset['bedrooms'].astype(str) + ' ' + dataset['agent'].fillna('')

vectorizer = TfidfVectorizer()

tfidf_matrix = vectorizer.fit_transform(dataset['content'])

knn_model = NearestNeighbors(metric='cosine', algorithm='brute')
knn_model.fit(tfidf_matrix)

def preprocess_text(text):
    text = text.lower()

    text = re.sub(r'[^\w\s]', '', text)

    return text

def get_recommendations(user_input, top_n=5):
    user_input = preprocess_text(user_input)

    user_input_vector = vectorizer.transform([user_input])

    _, indices = knn_model.kneighbors(user_input_vector, n_neighbors=top_n)

    recommended_items = [dataset.iloc[i] for i in indices.squeeze()]
    return recommended_items

user_input = "<user input goes here>"
recommendations = get_recommendations(user_input)

recommendations_df = pd.DataFrame(recommendations)

columns_order = [
    'property_id','location_id','location', 'city',
    'province_name', 'price','purpose','agent'
]
valid_columns = [col for col in columns_order if col in recommendations_df.columns]
recommendations_df = recommendations_df[valid_columns]

recommendations_list = recommendations_df.to_dict('records')

print(recommendations_list)
export {
    preprocessText,
    getRecommendations
  };