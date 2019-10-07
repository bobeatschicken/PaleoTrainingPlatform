# PaleoTrainingPlatform

> Training platform aimed to provide an interactive training platform for paleopathologists learning to score porous cranial lesions, in order to better calibrate/standardize scores of skeletal pathology for archaeologists who study ancient health.

## Installation and Setup Instructions

```bash
# Install dependencies
npm install

# Serve API on localhost:8000
python3 paleotrainingplatform/manage.py runserver

# Run webpack (from root)
npm run dev

# Build for production
npm run build
```
## Project Layout
paleotrainingplatform                   
├── frontend
  ├── src
  ├── static
  ├── templates
├── paleotrainingplatform
├── training (backend)
