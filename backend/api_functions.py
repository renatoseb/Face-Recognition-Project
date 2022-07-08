import os
import time
import face_recognition
import math
import shutil
import pickle
import numpy as np

from rtree import index
from heapq import heappush, heappop
from multiprocessing import Process, Queue

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}


def allowed_file(filename):
    return "." in filename and \
        filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def euclidean_distance(x, y):
    return (sum((x - y)**2))**0.5


# default values for K clossest elements and N elements for collection
k_clossest = 8
n_elements = 100

# rtree index creation
index_property = index.Property()
index_property.dimension = 128
index_property.buffering_capacity = 3
index_property.dat_extension = 'data'
index_property.idx_extension = 'index'

index = index.Index(properties=index_property)

# global variables
end_queue = Queue()
bank_directory = 'images/lfw/'
query_directory = 'images/query/'
index_directory = 'indexes/'

file_encodings = []
encoding_results = []
image_id = 0

# clear query images directory
for directory in [query_directory]:
    for path in os.listdir(directory):
        full_path = os.path.join(directory, path)
        shutil.rmtree(full_path, ignore_errors=True)


# Functions for API use

def folder_encoding(folder_name):
    encodings = list()
    for image_name in os.listdir(bank_directory + folder_name):
        image_directory = bank_directory + folder_name + '/' + image_name
        image = face_recognition.load_image_file(image_directory)
        image_encoding = face_recognition.face_encodings(image)

        if len(image_encoding) != 0:
            # Append the results to file_encodings list
            encodings.append((image_encoding[0], image_directory))

    return encodings


def assign_folders(folderlist, thread_number):
    print('thread', thread_number, 'starting...')

    result = list()
    length = len(folderlist)
    counter = 0
    progress_showed = False

    for folder in folderlist:
        result = result + folder_encoding(folder)

        counter = counter + 1
        progress = (counter/length)*100
        if int(math.ceil(progress)) % 5 == 0:
            if progress_showed is False:
                print('thread', thread_number, ':',
                      math.ceil(progress), '%', 'completed')
                progress_showed = True
        else:
            progress_showed = False

    print('thread', thread_number, 'done!')
    end_queue.put(result)
    return


def generate_encodings(N=-1, thread_count=2):
    global file_encodings
    counter = 0

    # Divides list of image directories for multiprocessing
    splitted_list = 0
    if N == -1:
        splitted_list = np.array_split(os.listdir(bank_directory), thread_count)
    else:
        splitted_list = np.array_split(os.listdir(bank_directory)[0:N], thread_count)

    for thread_number in range(thread_count):
        thread = Process(target=assign_folders,
                         args=(splitted_list[thread_number], thread_number, ))
        thread.start()

    for thread in range(thread_count):
        file_encodings = file_encodings + end_queue.get()

    for encoding in file_encodings:
        result = encoding[0]
        encoding_results.append(result)
        result = result.tolist() + result.tolist()
        index.insert(counter, result, obj=encoding[1])
        counter = counter + 1


# Main API functions


def sequential_search(image_encoding, k):
    global file_encodings
    priority_queue = []
    distances = face_recognition.face_distance(encoding_results, image_encoding[0])
    for i in range(len(distances)):
        heappush(priority_queue, (1/distances[i], file_encodings[i][1]))
        if(len(priority_queue) > k):
            heappop(priority_queue)
    answers = sorted(priority_queue, key=lambda tup: tup[0], reverse=True)
    return answers


def write_encodings(N=-1):
    global file_encodings
    if N == -1:
        pickle.dump(file_encodings, open(index_directory + 'indexdata_' + "COMPLETE" + '.dat', "wb"))
    else:
        pickle.dump(file_encodings, open( index_directory + 'indexdata_' + str(N) + 'N.dat', "wb" ))


def load_encodings(N=-1):
    global file_encodings
    if N == -1:
        file_encodings = list(pickle.load(open(index_directory + 'indexdata_' + "COMPLETE" + '.dat', "rb")))
    else:
        file_encodings = list(pickle.load(open(index_directory + 'indexdata_' + str(N) + 'N.dat', "rb")))

    counter = 0
    for encoding in file_encodings:
        result = encoding[0]
        encoding_results.append(result)
        result = result.tolist() + result.tolist()
        index.insert(counter, result, obj=encoding[1])
        counter = counter + 1


def search(image_directory, K, search_type):
    image_encoding = face_recognition.face_encodings(face_recognition.load_image_file(image_directory))

    if len(image_encoding) == 0:
        print('Face not found on image')
        return tuple()
    else:
        q = image_encoding[0].tolist()

        if search_type == "rtree":
            rtree_timer_init = time.time()
            rtree_results = index.nearest(q, objects=True, num_results=K)
            rtree_timer_end = time.time()

            print("\nThe", K, "clossest neightbours of ", image_directory, "using KNN-RTree are: ")
            result = list()

            for result in rtree_results:
                image_directory = result.object
                result.append(image_directory)
                print(image_directory)

            print("r-tree took ", rtree_timer_end - rtree_timer_init)
            return (image_directory, result, rtree_timer_end - rtree_timer_init)

        if search_type == "sequential":
            sequential_timer_init = time.time()
            sequential_results = sequential_search(image_encoding, K)
            sequential_timer_end = time.time()
            print("\nThe", K, "clossest neightbours of ", image_directory, "using KNN-sequential are: ", sequential_results)
            print("KNN-sequential took ", sequential_timer_end - sequential_timer_init)
            return (image_directory, [n[1] for n in sequential_results], sequential_timer_end - sequential_timer_init)
