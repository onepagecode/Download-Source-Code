import tkinter as tk
from tkinter import simpledialog, messagebox
from bs4 import BeautifulSoup

HTML_PATH = "test3.html"

def add_to_html(data):
    with open(HTML_PATH, 'r', encoding='utf-8') as file:
        content = file.read()

    soup = BeautifulSoup(content, 'html.parser')
    table = soup.find(id='codeTable')

    # Create a new row for the table
    new_row = soup.new_tag("tr")

    # The order of columns based on your HTML structure
    columns_order = ["Name", "Explanation", "Watch", "Link", "Date"]

    for column in columns_order:
        td = soup.new_tag("td")
        a = soup.new_tag("a", href=data[column])
        a.string = data[column]
        td.append(a)
        new_row.append(td)

    # Insert new row into the table
    table.append(new_row)

    with open(HTML_PATH, 'w', encoding='utf-8') as file:
        file.write(str(soup))


def on_add():
    data = {
        "Name": entries[0].get(),
        "Explanation": entries[1].get(),
        "Watch": entries[2].get(),
        "Link": entries[3].get(),
        "Date": entries[4].get()
    }

    try:
        add_to_html(data)
        feedback_label.config(text="Entry added successfully!", fg="green")

        # Ask the user if they want to add another entry
        answer = messagebox.askyesno("Question", "Do you want to add another entry?")
        if answer:
            # Clear the entries for a new input
            for entry in entries:
                entry.delete(0, tk.END)
        else:
            root.quit()
    except Exception as e:
        feedback_label.config(text=f"Error: {str(e)}", fg="red")


root = tk.Tk()
root.title("Add Entry to HTML")

labels = ["Name Link", "Explanation Link", "Watch Link", "Link", "Date"]
entries = []

# Creating and placing labels and entries
for label_text in labels:
    label = tk.Label(root, text=label_text)
    label.pack(anchor='w', padx=10, pady=5)

    entry = tk.Entry(root, width=40)
    entry.pack(pady=5, padx=10, fill=tk.X)
    entries.append(entry)

# Button to add
add_button = tk.Button(root, text="Add", command=on_add)
add_button.pack(pady=20)

# Feedback label
feedback_label = tk.Label(root, text="")
feedback_label.pack(pady=10)

root.mainloop()
