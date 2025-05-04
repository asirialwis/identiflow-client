import { Component, EventEmitter, Input, Output, ViewChild, ElementRef, SimpleChanges } from '@angular/core';
import { CloudinaryService } from '../../services/cloudinary.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {

  @ViewChild('fileInput') fileInput!: ElementRef;
  @Output() imageUploaded = new EventEmitter<string>();
  @Output() imageRemoved = new EventEmitter<void>();
  @Input() uploadTrigger: boolean = false;
  
  selectedFile: File | null = null;
  isUploading = false;
  uploadError: string | null = null;


  constructor(private cloudinaryService: CloudinaryService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['uploadTrigger'] && this.uploadTrigger) {
      if (this.selectedFile) {
        this.uploadImage();
      } else {
        // Immediately emit undefined when no file is selected
        this.imageUploaded.emit(undefined);
      }
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.uploadError = null;
      
      
    }
  }

  async uploadImage(): Promise<void> {
    if (!this.selectedFile) return;

    this.isUploading = true;
    this.uploadError = null;

    try {
      const response = await this.cloudinaryService.uploadImage(this.selectedFile);
      this.imageUploaded.emit(response);
    } catch (error) {
      console.error('Upload failed:', error);
      this.uploadError = 'Failed to upload image. Please try again.';
      this.imageUploaded.emit(undefined); // Notify parent of failure
    } finally {
      this.isUploading = false;
    }
  }
  

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

}
