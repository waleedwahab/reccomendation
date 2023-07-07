# from flask import Flask, request, render_template, jsonify
# from joblib import load
# import re
# import pandas as pd
# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.neighbors import NearestNeighbors
# from flask_cors import CORS
# import numpy as np
# import traceback
# from flask import jsonify
# dataset = pd.read_csv('Property_with_Feature_Engineering.csv')

# # Convert numerical columns to strings
# dataset['price'] = dataset['price'].astype(str)
# dataset['baths'] = dataset['baths'].astype(str)
# dataset['area'] = dataset['area'].astype(str)
# dataset['bedrooms'] = dataset['bedrooms'].astype(str)
# dataset['city'] = dataset['city'].astype(str)

# # Concatenate the relevant features into a single text column
# dataset['content'] = dataset['property_type'] + ' ' + dataset['price'].astype(str) + ' ' + dataset['city'] + ' ' + dataset['baths'].astype(str) + ' ' + dataset['area'].astype(str) + ' ' + dataset['purpose'] + ' ' + dataset['bedrooms'].astype(str) + ' ' + dataset['agent'].fillna('')

# # Create a TF-IDF vectorizer
# vectorizer = TfidfVectorizer()

# # Preprocess and transform the text data
# tfidf_matrix = vectorizer.fit_transform(dataset['content'])

# # Train the NearestNeighbors model
# model = NearestNeighbors(metric='cosine', algorithm='brute')
# model.fit(tfidf_matrix)

# app = Flask(__name__)
# CORS(app)

# def preprocess_text(text):
#     # Convert to lowercase
#     text = text.lower()

#     # Remove punctuation
#     text = re.sub(r'[^\w\s]', '', text)

#     return text


# def get_recommendations(user_input, city=None, page=1, per_page=5):
#     # Preprocess user input
#     user_input = preprocess_text(user_input)

#     # Create TF-IDF vector for user input
#     user_input_vector = vectorizer.transform([user_input])

#     # Filter dataset by city if provided
#     if city:
#         filtered_dataset = dataset[dataset['city'].str.contains(city, case=False)]
#     else:
#         filtered_dataset = dataset

#     # Check if the filtered dataset is empty
#     if filtered_dataset.empty:
#         return []

#     # Get the indices and distances of similar items
#     distances, indices = model.kneighbors(user_input_vector)

#     # Calculate pagination indices
#     start_idx = (page - 1) * per_page
#     end_idx = start_idx + per_page

#     # Check if the indices are within the bounds of the dataset
#     if start_idx >= len(indices[0]) or start_idx < 0:
#         return []

#     # Get the recommended items for the specified page
#     recommended_indices = indices[0, start_idx:end_idx]
#     recommended_items = filtered_dataset.iloc[recommended_indices]

#     # Convert NaN values to None
#     recommended_items = recommended_items.where(pd.notnull(recommended_items), None)

#     # Convert the DataFrame to a list of dictionaries
#     recommended_items = recommended_items.to_dict('records')
#      # Add image URL from the CSV to the recommended items
#     for item in recommended_items:
#         item['image'] = dataset.loc[item['property_id'] - 1, 'image']
#     return recommended_items


# @app.route('/')
# def index():
#     return "hello"


# @app.route('/recommend', methods=['GET'])
# def recommendation():
#     try:
#         argument = request.args.get('argument')
#         city = request.args.get('city')
#         print("City::::: ",city)
#         page = int(request.args.get('page', 1))
#         per_page = int(request.args.get('per_page', 5))

#         result = get_recommendations(argument, city, page, per_page)

#         # Calculate total pages
#         total_pages = int((len(result) + per_page - 1) / per_page)

#         # Adjust the start and end indices to prevent out-of-bounds error
#         start_idx = (page - 1) * per_page
#         end_idx = min(start_idx + per_page, len(result))

#         # Get the recommended items for the specified page
#         recommended_items = result[start_idx:end_idx]

#         # Create response dictionary
#         response = {
#             'page': page,
#             'per_page': per_page,
#             'total_pages': total_pages,
#             'data': recommended_items
#         }

#         return jsonify(response)
#     except Exception as e:
#         traceback.print_exc()
#         return jsonify({'error': str(e)}), 500

# @app.route('/all_content', methods=['GET'])
# def all_content():
#     try:
#         # Replace NaN values with None
#         content = dataset.where(pd.notnull(dataset), None)

#         # Convert the DataFrame to a list of dictionaries
#         content = content.to_dict('records')

#         # Create response dictionary
#         response = {
#             'data': content
#         }

#         return jsonify(response)
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

# if __name__ == '__main__':
#     app.run(host='192.168.43.127')
