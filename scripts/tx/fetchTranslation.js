// TODO: Implement
// DeepL API: Translate ja_JP_unique_strings.txt into en_US_unique_strings.txt
// See if its possible to upload a fresh glossary every time to account for updates to the glossary.csv
// Make sure output is the same length as input since we use indices to correlate them

// If the `ja_JP_unique_strings.txt` is too large, the DeepL API will reject it. 
// One option is to split it into separate server/client files and try again. 
// An easier but more manual alternative is to paste it into an `.xlsx` spreadsheet, manually upload it to DeepL to translate, and paste the translation back into a `.txt` file then continue the steps.