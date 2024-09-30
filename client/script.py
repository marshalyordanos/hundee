# # import os
# # import re

# # def search_and_write_console_logs(directory, output_file):
# #     with open(output_file, 'w') as log_file:
# #         pattern = re.compile(r'console\.log\([\s\S]*?\);?')  # Regex pattern for console.log() occurrences
# #         for dirpath, dirnames, filenames in os.walk(directory):
# #             for filename in filenames:
# #                 filepath = os.path.join(dirpath, filename)
# #                 if filepath.endswith('.js'):  # Process JavaScript files
# #                     with open(filepath, 'r') as file:
# #                         file_content = file.read()
# #                         matches = pattern.finditer(file_content)
# #                         for match in matches:
# #                             log_file.write(f'Found console.log() in: {filepath}:\n')
# #                             log_file.write(f'{match.group().strip()}\n\n')

# # # Get the directory path of the Python script
# # current_directory = os.path.join(os.path.dirname(__file__), 'src')
# # search_directory = current_directory  # Set the search directory to the script's directory
# # output_log_file = os.path.join(current_directory, 'log.txt')

# # # print()
# # search_and_write_console_logs(search_directory, output_log_file)
# import os
# import re

# def search_and_remove_console_logs(directory, output_file):
#     pattern = re.compile(r'console\.log\([\s\S]*?\)\s*;?')  # Regex pattern for console.log() occurrences

#     with open(output_file, 'w') as log_file:
#         for dirpath, dirnames, filenames in os.walk(directory):
#             for filename in filenames:
#                 filepath = os.path.join(dirpath, filename)
#                 if filepath.endswith('.js'):  # Process JavaScript files
#                     with open(filepath, 'r') as file:
#                         file_content = file.read()

#                     # Log console.log() occurrences before removing
#                     matches = pattern.finditer(file_content)
#                     for match in matches:
#                         log_file.write(f'Found console.log() in: {filepath}:\n')
#                         log_file.write(f'{match.group().strip()}\n\n')

#                     # Remove console.log() occurrences
#                     modified_content = re.sub(pattern, '', file_content)
                    
#                     with open(filepath, 'w') as file:
#                         file.write(modified_content)

# # Get the directory path of the Python script
# current_directory = os.path.join(os.path.dirname(__file__), 'src')
# search_directory = current_directory  # Set the search directory to the script's directory
# output_log_file = os.path.join(current_directory, 'log.txt')

# search_and_remove_console_logs(search_directory, output_log_file)
