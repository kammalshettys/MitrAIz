import os

async def saveAudio(audio):
    directory = "uploads"
    os.makedirs(directory, exist_ok=True)  # Create directory if it doesn't exist
    file_path = os.path.join(directory, audio.filename)
    with open(file_path,"wb") as f:
        f.write(await audio.read())


async def save_character(
    character: Character,
    character_image: UploadFile = File(...),
):
    
      # Save the character data to the characters_data list
    characters_data.append(character)

    # Save the uploaded image to the server
    upload_folder = "character_uploads"
    upload_folder_path = os.path.join(os.getcwd(), upload_folder)
    os.makedirs(upload_folder_path, exist_ok=True)
    file_path = os.path.join(upload_folder_path, character_image.filename)

    with open(file_path, "wb") as f:
        shutil.copyfileobj(character_image.file, f)

    # Return the saved character data
    return characters_data