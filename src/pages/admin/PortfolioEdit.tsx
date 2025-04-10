
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Image size should be less than 5MB",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setImagePreview(base64String);
      form.setValue("image", base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    form.setValue("image", "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAdditionalImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Image size should be less than 5MB",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const newAdditionalImages = [...additionalImages, base64String];
      const newAdditionalImagePreviews = [...additionalImagePreviews, base64String];
      
      setAdditionalImages(newAdditionalImages);
      setAdditionalImagePreviews(newAdditionalImagePreviews);
      form.setValue("additionalImages", newAdditionalImages);
      
      // Clear the input for next upload
      if (event.target) {
        event.target.value = "";
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAdditionalImage = (index: number) => {
    const newAdditionalImages = [...additionalImages];
    const newAdditionalImagePreviews = [...additionalImagePreviews];
    
    newAdditionalImages.splice(index, 1);
    newAdditionalImagePreviews.splice(index, 1);
    
    setAdditionalImages(newAdditionalImages);
    setAdditionalImagePreviews(newAdditionalImagePreviews);
    form.setValue("additionalImages", newAdditionalImages);
  };
